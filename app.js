const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();
const welcome = require("./routes/welcome")
const productRouter = require("./routes/productRouter")


app.use(cors());
require("./config/database");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
    req.io = app.get("io")
    next();
})

app.use("/", function (req, res, next) {
    let date = new Date();
    let currentTime = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1).toISOString();
    console.log(currentTime + "__" + req.protocol + "://" + req.get("host") + req.originalUrl);
    next();
});

app.use("/", welcome, productRouter)





module.exports = app