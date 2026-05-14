const express = require("express");
const NoteModel = require("./model/note.model")
const cors = require("cors")
const app = express();
app.use(cors())
app.use(express.json())
// sabse pehle hum api main data insert karenge aur uss data ko mongodb main store karenge
//.post method ka use karenge yaha pe data ko create karne ke liye
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body;
    const notes = await NoteModel.create({
        title, description
    })
    res.status(201).json({
        message: "note created",
        notes
    })
});

// yaha pe user api main jo bhi data hai usko read kar skhe
// app.get() method ka use karenge taaki user data dekh skhe
app.get("/api/notes", async (req, res) => {
    const notes = await NoteModel.find()
    res.status(200).json({
        message: "data fetch",
        notes
    })
})

// ab user ko ek aur feature dena hai humko daati woh delete kare skhe kuch particular notes jo usne ceate kiya hai 
// app.delete() ka use karenge taaki user database se notes delete kar sakhe
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const notes = await NoteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "data deleted",
        notes
    })
})
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body
    const notes = await NoteModel.findByIdAndUpdate(id, { description })
    res.status(200).json({
        message: "notes updated sucessfully",
        notes
    })
})
module.exports = app;
