import AWS from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configure AWS SDK for DigitalOcean Spaces
// const spacesEndpoint = new AWS.Endpoint("lon1.digitaloceanspaces.com");
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
//   secretAccessKey: process.env.DO_SPACE_SECRET_KEY,
//   signatureVersion: "v4",
//   s3ForcePathStyle: true, // Important for non-AWS S3-compatible services
//   region: "lon1",
// });

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(
    process.env.DO_SPACE_ENDPOINT || "lon1.digitaloceanspaces.com"
  ),
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACE_SECRET_KEY,
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  region: "lon1",
});

export const GetVideoUrl = async (filename, contentType, isPrivate = false) => {
  const params = {
    Bucket: process.env.DO_SPACE_NAME,
    Key: `${Date.now()}-${filename}`,
    Expires: 60 * 60 * 24,
    ContentType: contentType,
    ACL: isPrivate ? "private" : "public-read",
  };

  try {
    return s3.getSignedUrl("putObject", params);
  } catch (error) {
    console.error("Detailed Signing Error:", {
      message: error.message,
      stack: error.stack,
      params,
    });
    throw error;
  }
};

// export const GetVideoUrl = async (
//   filename,
//   contentType,
//   isPrivate = false,
//   folder = "coursesVideos"
// ) => {
//   const params = {
//     Bucket: process.env.DO_SPACE_NAME,
//     Key: `${folder}/${Date.now()}-${filename}`,
//     Expires: 60 * 60 * 24,
//     ACL: isPrivate ? "private" : "public-read",
//     ContentType: contentType,
//   };

//   try {
//     const url = await s3.getSignedUrlPromise("putObject", params);
//     return url;
//   } catch (error) {
//     console.error(`Error uploading file to Spaces: ${error.message}`);
//     throw new Error(`Error uploading file: ${error.message}`);
//   }
// };

const uploadToSpaces = async (
  file,
  folder,
  isSavedLocaly = false,
  isPrivate = false
) => {
  if (!file) {
    throw new Error("No file provided for upload.");
  }
  const uniqueFileName = `${folder}/${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.DO_SPACE_NAME,
    Key: uniqueFileName,
    Body: isSavedLocaly ? fs.createReadStream(file.path) : file.buffer,
    ACL: isPrivate ? "private" : "public-read", // Set file permissions
    ContentType: file.mimetype, // Use the MIME type of the file
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Return the file URL
  } catch (error) {
    console.error(`Error uploading file to Spaces: ${error.message}`);
    throw new Error(`Error uploading file: ${error.message}`);
  } finally {
    // Clean up local file if saved locally
    if (isSavedLocaly) {
      try {
        await fs.promises.unlink(file.path);
      } catch (error) {
        console.error(`Error deleting local file: ${error.message}`);
      }
    }
  }
};
// const uploadToSpaces = async (
//   file,
//   folder,
//   isSavedLocaly = false,
//   isPrivate = false
// ) => {
//   if (!file) {
//     throw new Error("No file provided for upload.");
//   }

//   const uniqueFileName = `${folder}/${Date.now()}-${file.originalname}`;

//   const params = {
//     Bucket: process.env.DO_SPACE_NAME,
//     Key: uniqueFileName,
//     Body: isSavedLocaly ? fs.createReadStream(file.path) : file.buffer,
//     ACL: isPrivate ? "private" : "public-read", // Set file permissions
//     ContentType: file.mimetype, // Use the MIME type of the file
//   };

//   try {
//     const data = await s3.upload(params).promise();
//     return data.Location; // Return the file URL
//   } catch (error) {
//     console.error(`Error uploading file to Spaces: ${error.message}`);
//     throw new Error(`Error uploading file: ${error.message}`);
//   } finally {
//     // Clean up local file if saved locally
//     if (isSavedLocaly) {
//       try {
//         await fs.promises.unlink(file.path);
//         console.log(`Local file ${file.path} deleted successfully.`);
//       } catch (error) {
//         console.error(`Error deleting local file: ${error.message}`);
//       }
//     }
//   }
// };

export const deleteFromSpaces = async (filePath) => {
  const params = {
    Bucket: process.env.DO_SPACE_NAME,
    Key: filePath,
  };

  try {
    await s3.deleteObject(params).promise();
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    // throw new Error(`Failed to delete file: ${error.message}`);
  }
};

export default uploadToSpaces;
