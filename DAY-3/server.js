const express = require("express");
const app = express();
app.use(express.json())
const port = 3000;
app.listen(port, () => {
    console.log("server is running port", port);
});
const notes = [];
app.post("/notes", (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("notes created")
});
app.get("/notes", (req, res) => {
    res.send(notes)
})
