import multer from "multer"
const storage = multer.memoryStorage();
export const singleUpload= multer({storage}).single("file");// same as profile in signUp input type as file