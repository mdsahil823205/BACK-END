const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

/**
 * Uploads a buffer to ImageKit
 * @param {Buffer} buffer - The file buffer
 * @param {string} fileName - Name for the file
 * @param {string} folder - Destination folder path
 */
const uploadFile = async (buffer, fileName, folder = "") => {
    try {
        const fileContent = await toFile(buffer, fileName);
        const response = await client.files.upload({
            file: fileContent,
            fileName: fileName,
            folder: folder
        });
        return response;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw error;
    }
};

module.exports = { uploadFile };
