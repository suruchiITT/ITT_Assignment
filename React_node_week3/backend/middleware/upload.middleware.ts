// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = path.join(process.cwd(), "uploads", "profiles");

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (_req, file, cb) => {
//         const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, unique + path.extname(file.originalname));
//     }
// });

// const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/webp"];
//     if (allowed.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Invalid file type"));
//     }
// };

// const uploadProfilePic = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024
//     }
// }).single("profilePic");

// export {
//     uploadProfilePic
// };

import multer from "multer";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + "-" + file.originalname
    );

  }

});

const upload = multer({

  storage

});

export default upload;
