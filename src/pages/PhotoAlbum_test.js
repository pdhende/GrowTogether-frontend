import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

function PhotoAlbum() {
  // Create state to store file
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [displayFlag, setDisplayFlag] = useState(true);

  const setAWSVariables = () => {
    const S3_BUCKET = `${process.env.REACT_APP_BUCKET}`;

    // S3 Region
    const REGION = `${process.env.REACT_APP_REGION}`;

    // S3 Credentials
    AWS.config.update({
      accessKeyId: `${process.env.REACT_APP_ACCESS_KEY}`,
      secretAccessKey: `${process.env.REACT_APP_ACCESS_SECRET}`,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    return { s3, S3_BUCKET };
  };

  useEffect(() => {
    const { s3, S3_BUCKET } = setAWSVariables();
    console.log(S3_BUCKET);
  }, []);

  const FetchData = async () => {
    const { s3, S3_BUCKET } = setAWSVariables();
    const keyPrefix = "2";
    try {
      const params = {
        Bucket: S3_BUCKET,
        Prefix: keyPrefix,
      };

      s3.listObjectsV2(params, (err, data) => {
        const imgData = data.Contents;

        imgData.map(async (img) => {
          const objParams = {
            Bucket: S3_BUCKET,
            Key: img.Key,
          };

          const response = await s3.getObject(objParams).promise();
          if (response) {
            const base64Image = response.Body.toString("base64");
            const imageSrc = `data:image/jpeg;base64,${base64Image}`;
            setImageData((prevImgData) => [...prevImgData, imageSrc]);
          }
        });
      });
    } catch (error) {
      setError(error.message);
    }
    return (
      <div className="container">
        {imageData.map((img) => {
          return (
            <>
              <Row>
                <Col md={1}>
                  <img src={img} style={{ width: "25rem" }} alt="S3 Object" />
                </Col>
              </Row>
            </>
          );
        })}
      </div>
    );
  };

  // Function to upload file to s3
  const FileUploader = () => {
    const uploadFile = async () => {
      const { s3, S3_BUCKET } = setAWSVariables();
      const keyPrefix = "2";
      // const imgName = "otherImage";

      const params = {
        Bucket: S3_BUCKET,
        Key: keyPrefix + "_" + file.name,
        Body: file,
      };

      var upload = s3.putObject(params).promise();

      await upload.then((err, data) => {
        console.log(err);
        alert("File uploaded successfully.");
      });
    };
    // Function to handle file and store it to file state
    const handleFileChange = (e) => {
      // Uploaded file
      // console.log("file change");
      const file = e.target.files[0];
      // Changing file state
      setFile(file);
      console.log(file);
    };
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    );
  };

  return (
    <div className="App">
      {/* <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div> */}
      {/* <FileUploader /> */}
      <div>
        <FetchData />
      </div>
      {/* <div className="container">
        {imageData.map((img) => {
          return (
            <>
              <Row>
                <Col md={1}>
                  <img src={img} style={{ width: "25rem" }} alt="S3 Object" />
                </Col>
              </Row>
            </>
          );
        })}
      </div> */}
    </div>
  );
}

export default PhotoAlbum;
