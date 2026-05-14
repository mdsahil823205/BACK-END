/// yaha pe mera server chalega 
// yeh file ka kaam hai sabko chalana 
const app = require("./src/app");

const mongoose = require("mongoose")
const connectdb = require("./src/config/databse")
connectdb()

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port} port`)
});
