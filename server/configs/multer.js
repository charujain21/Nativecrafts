import multer from 'multer';

// Use memoryStorage to keep files as buffers in memory
const storage = multer.memoryStorage();

// Optional: File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images. Ensure you are selecting image files (e.g., jpg, png, webp).'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Example: 5MB limit per file
});