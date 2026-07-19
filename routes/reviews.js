const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");
const { validateReview,isLoggedIn,isreviewAuthor } = require("../middleware.js");

//post review route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview));
//Destroy review route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;