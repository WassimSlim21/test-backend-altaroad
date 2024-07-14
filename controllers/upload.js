const multer = require('multer');
const path = require('path');

// Set up storage engine for Multer
const storage = multer.diskStorage({
  /**
   * Specifies the destination directory for the uploaded files.
   * 
   * @param {Object} req - The request object.
   * @param {Object} file - The file object.
   * @param {Function} cb - The callback function.
   */
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  /**
   * Specifies the filename for the uploaded files.
   * 
   * @param {Object} req - The request object.
   * @param {Object} file - The file object.
   * @param {Function} cb - The callback function.
   */
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Initialize Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('file');

/**
 * Check file type to ensure it is an image.
 * 
   * @param {Object} file - The file object.
 * @param {Function} cb - The callback function.
 */
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

/**
 * Upload file controller function.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: 'No file selected!' });
      } else {
        res.json({
          message: 'File uploaded!',
          filePath: `/uploads/${req.file.originalname}`
        });
      }
    }
  });
};