const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
