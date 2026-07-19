const mongoose = require("mongoose");
const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js")
const initData = require("./data.js")
main().then((res) => console.log("connection successful"))
    .catch((err) => console.log(err));
async function main() {
    await mongoose.connect(Mongo_URL);
}
const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : '6a590268f44d85c1224046e2'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDb();