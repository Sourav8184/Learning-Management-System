import path from "path";
import multer from "multer";

/*
    app.post("/profile", upload.single("avatar"), function (req, res, next) {
        req.file is the `avatar` file
        req.body will hold the text fields, if there were any
    });

    app.post(
    "/photos/upload",
    upload.array("photos", 12),
    function (req, res, next) {
        req.files is array of `photos` files
        req.body will contain the text fields, if there were any
    });
*/

const upload = multer({
  dest: "uploads/", // Destination folder for uploaded files
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max file size limit
  storage: multer.diskStorage({
    destination: "uploads/", // Destination folder for storage
    filename: (_req, file, cb) => {
      cb(null, file.originalname); // Keep the original file name
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname); // Get the file extension
    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".png" &&
      ext !== ".mp4"
    ) {
      cb(new Error(`Unsupported file type! ${ext}`), false); // Reject unsupported file types
      return;
    }
    cb(null, true); // Accept supported file types
  },
});

export default upload;
