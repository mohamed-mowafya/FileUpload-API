const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");
const upload = require('../helpers/multerAWSHelper');


router.post("/upload", upload.any("file"), fileController.handleUpload);
module.exports = router;