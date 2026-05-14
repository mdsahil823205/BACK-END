import express from 'express';
const app = express()

app.get("/", (req, res) => {
    res.send("hello world")
})
app.get("/:login",(req,res)=>{
    res.send("login page ")
})
export default app