const mongoose = require("mongoose");
//Setting up Schema

const campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
