const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hello world");
});
const notes = [];
app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.send("notes created");
});
app.get("/notes", (req, res) => {
    res.send(notes);
});
app.delete("/notes/:index", (req, res) => {
    console.log(req.params.index);
    notes.splice(req.params.index, 1);;
    res.send("delete sucessfully");
});
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.send("update sucessfully")
});
module.exports = app;
