const express = require("express"); // express ko require kiye iss file main
const app = express(); // express ko create kiye
app.listen(8080, () => {
    console.log("listening on port no 8080");
}); // express ko start kiye

app.get("/home", (req, res) => {
    console.log("request recieved");
    res.sendFile(__dirname + '/index.html')
});
app.get("/user/:id", (req, res) => {
    console.log("request recieved");
    res.send("userid" + req.params.id)
});
// aur baaki ka day-2 main sikhenge ke kaise humlog banate hai program karke server
