const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cloudinary = require("../cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ msg: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

router.post("/", [auth, upload.single("coverimage")], (req, res) => {
  console.log(req.file);
  const coverimage = req.file;
  try {
    cloudinary.uploads(coverimage.path).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
