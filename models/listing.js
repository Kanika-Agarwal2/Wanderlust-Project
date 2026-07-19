const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const User = require("./user.js");
const listingSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    description : String,
image: {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1782229296505-d41b511f399c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
},
    price : {
        type : Number
    },
    location : String,
    country: String,
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});


listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

