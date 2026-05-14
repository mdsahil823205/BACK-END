const express = require("express");
const app = express();
const cors = require("cors");
const NotelModel = require("./model/Notes.model");
app.use(express.json());
app.use(cors());
app.use(express.static("./public"))
/// app.post()
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;
    const note = await NotelModel.create({
        title: title,
        description: description,
    });
    res.status(201).json({
        message: "notes created sucessfully",
        note,
    });
});

// app.get()
app.get("/api/notes", async (req, res) => {
    const note = await NotelModel.find();
    res.status(200).json({
        message: "notes fetch sucessfully",
        note,
    });
});

// app.delete()
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const note = await NotelModel.findByIdAndDelete(id);
    res.status(200).json({
        message: `this notes_id:${id} deleted`,
        note,
    });
});

// app.patch()
app.patch("/api/notes/:id", async (req, res) => {
    const { title, description } = req.body;
    const id = req.params.id;
    const note = await NotelModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true },
    );
    res.status(201).json({
        message: `notes_id:${id} updated`,
    });
});

module.exports = app;
