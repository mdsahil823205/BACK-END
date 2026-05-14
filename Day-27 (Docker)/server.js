import express from 'express';
const app = express()

app.listen(3000, () => {
    console.log("server is running on port no 3000")
})
app.get("/", (req, res) => {
    return res.send("helolo this is welcome page ")
})

app.get("/data", (req, res) => {
    const data = {
        id: 1,
        data: "sampleData",
        description: "this is the data of samle data"
    }
    return res.send(data)
})

