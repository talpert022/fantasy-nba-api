const path = require("path");
// loads the configuration from config.env to process.env
require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
// get MongoDB driver connection
const db_ops = require("./db/connection");

// perform database verification methods when the server starts
db_ops.connectToServer();

app.get("/", (req, res) => {
    var fileName = "home.html";
    console.log(path.dirname(__dirname));
    var options = {
        root: path.dirname(__dirname),
    };

    res.sendFile(fileName, options);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
