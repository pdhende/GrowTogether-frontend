import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import AddPhotoAlbum from "../components/AddPhotoAlbum";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import swal from "sweetalert";
import EmailPhotoModal from "../components/EmailPhotoModal";

function PhotoAlbum() {
  // Create state to store file
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [displayFlag, setDisplayFlag] = useState(true);
  const userId = localStorage.getItem("user_id");

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

    const keyPrefix = userId;
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
  }, []);

  // Function to upload file to s3
  const uploadFile = async () => {
    const { s3, S3_BUCKET } = setAWSVariables();
    const keyPrefix = userId;

    const params = {
      Bucket: S3_BUCKET,
      Key: keyPrefix + "_" + file.name,
      Body: file,
    };

    var upload = s3.putObject(params).promise();

    await upload.then((err, data) => {
      console.log(err);
      // alert("File uploaded successfully.");
      swal({ text: "Photo uploaded successfully!", icon: "success" });
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
    <>
      <div>
        <Header />
        <div className="background-img-resources-pg">
          <h1>Photo Album</h1>
          <br />
          <div>
            <input type="file" onChange={handleFileChange} />
            <Button className="custom-all-btn" onClick={uploadFile}>
              Add Photo
            </Button>
          </div>

          <MDBContainer className="mt-4">
            <MDBRow>
              {imageData.map((photo, index) => (
                <MDBCol md={4} key={index}>
                  <Card style={{ width: "100%" }}>
                    <Card.Img variant="top" src={photo} />
                    <Card.Body>
                      <Card.Text>
                        {/* {photo.description}
                        <br />{" "}
                        {moment(photo?.date).format("MMMM D, YYYY h:mm A")} */}
                      </Card.Text>
                    </Card.Body>
                    {/* <Button
                      className="green-btn"
                      onClick={() => openEmailModal(photo)}
                    >
                      Share
                    </Button> */}
                  </Card>
                </MDBCol>
              ))}
            </MDBRow>
          </MDBContainer>

          <AddPhotoAlbum
            show={showAddPhotoModal}
            onHide={() => setShowAddPhotoModal(false)}
            onSave={handleAddPhoto}
          />

          {/* <EmailPhotoModal
            show={showEmailModal}
            onHide={() => setShowEmailModal(false)}
            photo={selectedPhoto}
          // />

          <AddPhotoAlbum
            show={showAddPhotoModal}
            onHide={() => setShowAddPhotoModal(false)}
            onSave={handleAddPhoto}
          /> */}
        </div>
      </div>
      {/* <div className="App">
        <div className="container">
          <Row>
            {imageData.map((img) => {
              return (
                <>
                  <Col md={3}>
                    <img src={img} style={{ width: "25rem" }} alt="S3 Object" />
                  </Col>
                </>
              );
            })}
          </Row>
        </div>
      </div> */}
    </>
  );
}

export default PhotoAlbum;
