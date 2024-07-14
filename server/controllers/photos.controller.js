import cloudinary from "../config/cloudinary.js";
import pLimit from "p-limit";
import fs from "fs"

const limit = pLimit(10);

class PhotosController {
  static async localUpload(req, res) {
    try {
      const uploadedFiles = [];
      for (let i = 0; i < req.files.length; i++) {
        uploadedFiles.push(req.files[i].path);
      }
      if (uploadedFiles.length > 0) {
        const imagesToUpload = uploadedFiles.map((image) => {
          return limit(async () => {
            const result = await cloudinary.uploader.upload(image, { folder: 'Hommz' });
            fs.unlinkSync(image);
            return result.secure_url;
          });
        });
        const uploads = await Promise.all(imagesToUpload);
        return res.status(200).json({ files: uploads })
      }
      return res.status(400).json({ message: "please select a file to upload" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error uploading files", error });
    }
  }
}

export default PhotosController;
