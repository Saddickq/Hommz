import { v2 as cloudinary } from "cloudinary";
import { api_key, api_secret, cloud_name } from ".";
import fs from "fs"

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const uploadToCloudinary = async (locaFilePath) => {
  const filePathOnCloudinary = `main/${locaFilePath}`;

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      fs.unlinkSync(locaFilePath);
      return { message: "Success", url: result.url, };
    })
    .catch((error) => {
      fs.unlinkSync(locaFilePath);
      throw new Error('Upload to Cloudinary failed');
    });
};

export default uploadToCloudinary