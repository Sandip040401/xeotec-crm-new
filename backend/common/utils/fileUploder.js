const multer = require("multer");
const dotenv = require("dotenv");
const { default: axios } = require("axios");

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Upload file to CDN
 * @param {string} project - CDN project name
 * @param {string} fileType - File type (e.g. image, video, pdf)
 * @param {Object} file - File object from Multer
 * @returns {Promise<string>} - Uploaded file URL
 */
const uploadToCDN = async (project, fileType, file) => {
  if (!file) throw new Error("No file provided");

  try {
    const apiKey = process.env.CDN_API_KEY;
    const formData = new FormData();
    formData.append("project", project);
    formData.append("fileType", fileType);
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const cdnResponse = await axios.post(
      "https://cdn.nagadwallet.net/api/files/upload",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": apiKey,
        },
      }
    );

    const fileUrl = cdnResponse.data.fileUrl;

    if (!fileUrl) throw new Error("CDN upload failed.");

    return fileUrl;
  } catch (cdnError) {
    console.error("CDN Upload Error:", cdnError.message);
    throw new Error("CDN upload failed.");
  }
};

// Export the upload middleware and CDN uploader function
module.exports = { upload, uploadToCDN };
