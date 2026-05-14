import express from "express";

const app = express();

app.get("/api/hello", (req, res) => {
    res.send("Hello World!");
});
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "I'm alive, yo!",
    });
});
app.get("/api/user", (req, res) => {
    const user = [
        { username: "md sahil", age: 21, city: "lucknow" },
        { username: "md junaid", age: 20, city: "lucknow" },
        { username: "md usama", age: 19, city: "lucknow" },
    ];
    res.status(200).json(user);
});
app.listen(3000, () => {
    console.log("port is running at 3000")
})