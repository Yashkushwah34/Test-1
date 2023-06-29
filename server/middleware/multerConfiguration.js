import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Set the filename for uploaded files
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
