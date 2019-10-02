const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/yelp",{useNewUrlParser: true, useUnifiedTopology: true});

//Setting up Schema

const campgroundSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Salmon Creek",
//   img: "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg",
//   description: "Starry skies, Open grounds, Peaceful and Beautiful."
// }, (err, campground) => {
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Newly Created Campground!");
//     console.log(campground);
//   }
// });

const campgrounds = [
  {name: "Yosemite Park", img: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"},
  {name: "Salmon Creek", img: "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg"},
  {name: "Devil's Spot", img: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
  {name: "Yosemite Park", img: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"},
  {name: "Salmon Creek", img: "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg"},
  {name: "Devil's Spot", img: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"},
  {name: "Yosemite Park", img: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"},
  {name: "Salmon Creek", img: "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg"},
  {name: "Devil's Spot", img: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"}
]
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//home page
app.get("/", (req, res) =>{
  res.render('home');
});

//Campgrounds Page
//INDEX route- shows all campgrounds
app.get("/campgrounds", (req, res) =>{

  //Get all Campgrounds from DB
  Campground.find({}, (err, allCampgrounds) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render("index",{campgrounds: allCampgrounds});
    }
  });
});

//CREATE route - add new campground to DB
app.post("/campgrounds",(req, res) =>{
  const name = req.body.name;
  const img = req.body.img;
  const desc = req.body.description;
  const newCamp = {name: name, img: img, description: desc}
  // campgrounds.push(newCamp);
  //Save campground to DB
  Campground.create(newCamp, (err, newlyCreated)=>{
    if(err){
      console.log(err);
    }
    else{
    //redirect back to campgrounds page
    res.redirect("/campgrounds");

    }
  });
});

//NEW route- shows form to create new campground
app.get("/campgrounds/new", (req, res) =>{
  res.render("new");
})

//SHOW route
app.get("/campgrounds/:id", (req, res) =>{
  //find campground with id and render show template with campground info
  Campground.findById(req.params.id, (err, foundCampground)=>{
    if(err){
      console.log(err);
    }
    else{
        res.render("show", {campground: foundCampground})
    }
  });
});

//setting up listening function
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("YelpCamp Server Has Started!");
});
