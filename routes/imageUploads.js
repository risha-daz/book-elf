const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
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
  try {
    const cover = req.file.filename;
    return res.json({ cover });
  } catch (err) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
