/**
 * Firebase Storage Utility Module.
 * 
 * This module provides functionality to interact with Firebase Storage, 
 * specifically to upload files and optionally delete existing ones.
 * It uses Google Cloud Storage SDK to perform these operations.
 * 
 */

const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const env = require("../config/env");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const uuid = uuidv4();

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: "delivery-cucei",
  keyFilename: "./serviceAccountKey.json",
});

// Define the Google Cloud Storage bucket
const bucket = storage.bucket("gs://delivery-cucei.appspot.com/");

/**
 * Uploads a file to Firebase Storage.
 *
 * @function
 * @param {File} file - The file object that will be stored in Firebase Storage.
 * @param {string} pathImage - The path to save the image to in Firebase Storage.
 * @param {string} deletePathImage - The path to the image in Firebase Storage to delete (if specified).
 * @returns {Promise<string>} - A promise that resolves to the public URL of the uploaded file.
 */
module.exports = (file, pathImage, deletePathImage) => {
  return new Promise((resolve, reject) => {
    console.log("delete path", deletePathImage);
    
    // If a delete path is specified, delete the existing file in Firebase Storage.
    if (deletePathImage) {
      if (deletePathImage !== null && deletePathImage !== undefined) {
        const parseDeletePathImage = url.parse(deletePathImage);
        const ulrDelete = parseDeletePathImage.pathname.slice(23);
        const fileDelete = bucket.file(`${ulrDelete}`);

        fileDelete
          .delete()
          .then(() => {
            console.log("Image deleted successfully");
          })
          .catch((err) => {
            console.log("Failed to remove photo, error:", err);
          });
      }
    }

    // If a path is specified, upload the new file to Firebase Storage.
    if (pathImage) {
      if (pathImage !== null && pathImage !== undefined) {
        const fileUpload = bucket.file(`${pathImage}`);
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: "image/png",
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
          resumable: false,
        });

        blobStream.on("error", (error) => {
          console.log("Error uploading file to Firebase", error);
          reject("Something is wrong! Unable to upload at the moment.");
        });

        blobStream.on("finish", () => {
          // Construct the public URL for direct HTTP access.
          const publicUrl = format(
            `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`
          );
          console.log("CLOUD STORAGE URL ", publicUrl);
          resolve(publicUrl);
        });

        // Begin the upload process.
        blobStream.end(file.buffer);
      }
    }
  });
};
