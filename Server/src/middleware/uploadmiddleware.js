import multer from "multer";
import path from "path";

// Set multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// File filter to only accept images
const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! Please upload an image"));
  }
};

const uploadMiddleware = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB per file
  },
});

export default uploadMiddleware;
