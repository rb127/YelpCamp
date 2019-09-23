const express = require('express');
const app = express();

app.set("view engine", "ejs");

//home page
app.get("/", (req, res) =>{
  res.render('home');
});

//Campgrounds Page
app.get("/campgrounds", (req, res) =>{
  var campgrounds = [
    {name: "Yosemite Park", img: "https://www.tripsavvy.com/thmb/OK1-aDJ9tLlmzuwSiCDF6cepIpA=/2914x1960/filters:fill(auto,1)/camping-in-yosemite-woods-523679818-57a1012e3df78c3276e958ab.jpg"},
    {name: "Salmon Creek", img: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c73267ad0914fc551_340.jpg"},
    {name: "Devil's Spot", img: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c73267ad0934ccd51_340.jpg"}
  ]
  const check = 99;
  var test = ["TEST 1", "TEST 2"];
  res.render("campgrounds",{campgrounds: campgrounds, check: check, test: test});
});


//setting up listening function
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("YelpCamp Server Has Started!");
});
