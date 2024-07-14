const util = require('util');
const multer = require('multer');
const path = require('path');

const maxSize = 2 * 1024 * 1024; // 2MB file size limit

// Set up storage engine for Multer
let storage = multer.diskStorage({
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
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).single('file');

// Promisify the uploadFile middleware
let uploadFileMiddleware = util.promisify(uploadFile);

// Export the middleware
module.exports = uploadFileMiddleware;