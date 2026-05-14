// yaha pe mera server create hue hai
require("dotenv").config()
const express = require("express");
const noteModel = require("./models/notes.model");
const app = express();
app.use(express.json());
/// yaha pe ab hum banaiyenge post method jab bhi user req.body main kuch dhaale toh database main save ho jaaiye
// post
app.post("/notes", async (req, res) => {
    const { title, description } = req.body;
    const notes = await noteModel.create({
        title,
        description,
    });
    res.status(201).json({
        message: "notes created",
        notes,
    });
});

// yaha pe jo bhi data store user ne kiya hai database main woh data ko dekh sakhega with the help of get
// get
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "fetch notes",
        notes,
    });
});

module.exports = app;
