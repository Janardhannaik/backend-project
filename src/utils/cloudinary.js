import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (locatFilePath) => {
  try {
    if (!locatFilePath) return null;
    //upload the file on cloudnary
    cloudinary.uploader.upload(locatFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(locatFilePath);
    return null;
  }
};

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);

export { uploadOnCloudinary };
