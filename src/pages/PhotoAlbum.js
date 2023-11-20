import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Button, Card } from "react-bootstrap";
import moment from "moment";
import AddPhotoAlbum from "../components/AddPhotoAlbum";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import swal from "sweetalert";
import EmailPhotoModal from "../components/EmailPhotoModal";
import AWS from "aws-sdk";

function PhotoAlbum() {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
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

  const handleIndexPhotos = () => {
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
            setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
          }
        });
      });
    } catch (error) {
      setError(error.message);
    }
  };

  //update later to call to AWS S3 bucket
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
      swal({ text: "Photo uploaded successfully!", icon: "success" });
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  useEffect(() => {
    handleIndexPhotos();
  }, []);

  return (
    <div>
      <Header />
      <div className="background-img-resources-pg">
        <h1>Photo Album</h1>
        <br />
        <div>
          <Button className="custom-all-btn">
            <input type="file" onChange={handleFileChange} />
          </Button>
          <Button className="custom-all-btn" onClick={uploadFile}>
            Add Photo
          </Button>
        </div>

        <MDBContainer className="mt-4">
          <MDBRow>
            {photos.map((photo, index) => (
              <MDBCol md={4} key={index}>
                <Card style={{ width: "100%" }}>
                  <Card.Img variant="top" src={photo} />
                  <Card.Body>
                    <Card.Text></Card.Text>
                  </Card.Body>
                  <Button
                    className="green-btn"
                    // onClick={() => openEmailModal(photo)}
                  >
                    Share
                  </Button>
                </Card>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

export default PhotoAlbum;
