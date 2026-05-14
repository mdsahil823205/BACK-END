import express from "express";
const app = express()

app.get("/", (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000000; i++) {
        sum += i
    }
    res.send(`Hello World the sum is ${sum}`)
})

app.listen(3000, () => {
    console.log("server is running on port number:3000")
})