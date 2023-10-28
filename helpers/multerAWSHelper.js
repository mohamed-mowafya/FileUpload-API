const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: process.env.FILE_BUCKET_NAME,
  key: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let fileTypes = /jpg|jpeg|png|pdf|doc|docx|zip/;
    let mimeTypes = fileTypes.test(file.mimetype);

    if(!mimeTypes){
      cb("An error has occured, please use the correct file format.")    
    }

    cb();
  },
});

module.exports = upload;
