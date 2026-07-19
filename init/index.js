if (process.env.NODE_ENV != "production") {
    require("dotenv").config({ path: "../.env" });
}
const mongoose = require("mongoose");
const Listing = require("../models/listing.js")
const initData = require("./data.js");
const dbURL = process.env.ATLASDB_URL;
main().then((res) => console.log("connection successful"))
    .catch((err) => console.log(err));
async function main() {
    await mongoose.connect(dbURL);
}
const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "6a5ca4879cfccb5230f56144"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDb();
