const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);

const URL = process.env.MONGO_URL;


const db = mongoose
    .connect(URL, { useNewUrlParser: true })
    .then((e) => {
        console.log(`connected`);
    })
    .catch((error) => console.log(error));
module.exports = db;
