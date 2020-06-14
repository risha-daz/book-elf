import React, { useState, useEffect, Fragment, useContext } from "react";
import BookContext from "../../../context/book/bookContext";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar } from "@material-ui/core";
import NoImage from "../../../no_image.jpg";
const useStyles = makeStyles((theme) => ({
  input: { display: "none" },
}));

const ImageUpload = (props) => {
  const bookContext = useContext(BookContext);
  const [file, setFile] = useState();
  const classes = useStyles();
  useEffect(() => {
    setFile(props.imagevalue);
    if (bookContext.current !== null) {
      if (bookContext.current.cover) {
        setFile(`uploads/${bookContext.current.cover}`);
      } else {
        setFile("");
      }
    }
  }, [props.imagevalue, bookContext, bookContext.current]);
  const imageReader = new FileReader();
  imageReader.onloadend = function (e) {
    setFile(e.target.result);
  };

  const imgUploaded = (e) => {
    setFile(e.target.files[0]);
    props.onUploadImage(e.target.files[0]);
    imageReader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={file || NoImage}
        alt='no image'
        style={{ width: "188px", margin: "10px" }}
      />

      <input
        accept='image/*'
        id='cover-upload'
        className={classes.input}
        type='file'
        onChange={imgUploaded}
      />
      <label htmlFor='cover-upload'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
    </div>
  );
};

export default ImageUpload;
