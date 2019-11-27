const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seed");

Comment = require("./models/comments");

mongoose.connect("mongodb://localhost/yelp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//seed database
seedDB();

//home page
app.get("/", (req, res) => {
  //res.render("home");
  res.redirect("/campgrounds");
});

//Campgrounds Page
//INDEX route- shows all campgrounds
app.get("/campgrounds", (req, res) => {
  //Get all Campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE route - add new campground to DB
app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const img = req.body.img;
  const desc = req.body.description;
  const newCamp = { name: name, img: img, description: desc };

  //Save campground to DB
  Campground.create(newCamp, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

//NEW route- shows form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

//SHOW route
app.get("/campgrounds/:id", (req, res) => {
  //find campground with id and render show template with campground info
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);

        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//=================
//COMMENT ROUTES
//=================

app.get("/campgrounds/:id/comments/new", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

app.post("/campgrounds/:id/comments", (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comments, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          console.log(campground);

          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

//setting up listening function
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log("YelpCamp Server Has Started!");
});
