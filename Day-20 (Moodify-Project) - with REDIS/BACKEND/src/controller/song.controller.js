const id3 = require("node-id3");
const storageService = require("../services/storage.service");
const songModel = require("../models/song.model");

const songPostController = async (req, res) => {
  try {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    // Read metadata from the MP3 buffer
    const tags = id3.read(songBuffer);
    const title = tags.title || "Untitled";

    // Execute uploads in parallel
    const [songFile, posterFile] = await Promise.all([
      storageService.uploadFile(
        songBuffer,
        `${title}.mp3`,
        "/cohort/moodify/songs",
      ),

      // Only upload poster if image exists in tags
      tags.image
        ? storageService.uploadFile(
            tags.image.imageBuffer,
            `${title}.jpeg`,
            "/cohort/moodify/poster",
          )
        : Promise.resolve({ url: null }),
    ]);

    const song = await songModel.create({
      title: title,
      url: songFile.url,
      posterUrl: posterFile.url,
      mood: mood,
    });

    res.status(200).json({
      message: "Song uploaded successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

const songFetchController = async (req, res) => {
  const { mood } = req.query;
  const song = await songModel.find({
    mood,
  });

  res.status(200).json({
    messsage: "song fetch sucessfully",
    song,
  });
};

module.exports = { songPostController, songFetchController };
