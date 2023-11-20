import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

function PhotoAlbum() {
  // Create state to store file
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

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

  useEffect(() => {
    const fetchData = async () => {
      const keyPrefix = "1";

      try {
        const params = {
          Bucket: S3_BUCKET,
          Prefix: keyPrefix,
        };

        s3.listObjectsV2(params, (err, data) => {
          const imgData = data.Contents;
          console.log("--", imgData);

          imgData.map(async (img) => {
            const objParams = {
              Bucket: S3_BUCKET,
              Key: img.Key,
            };

            const response = await s3.getObject(objParams).promise();
            if (response) {
              setCount((count) => count + 1);
              console.log("--||", count);
              const base64Image = response.Body.toString("base64");
              const imageSrc = `data:image/jpeg;base64,${base64Image}`;
              setImageData((prevImgData) => [...prevImgData, imageSrc]);
            }
          });
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Function to upload file to s3
  const uploadFile = async () => {
    const keyPrefix = "1";
    const imgName = "newImage";

    const params = {
      Bucket: S3_BUCKET,
      Key: keyPrefix + "_" + imgName,
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
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  return (
    <div className="App">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
      <div className="container" style={{ width: "100%", border: "1px solid" }}>
        {imageData.map((img) => {
          return (
            <Row>
              <Col md={3}>
                <img src={img} style={{ width: "30%" }} alt="S3 Object" />
              </Col>
            </Row>
          );
        })}
      </div>
    </div>
  );
}

export default PhotoAlbum;
