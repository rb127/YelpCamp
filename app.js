const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var campgrounds = [
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
app.get("/campgrounds", (req, res) =>{
  res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds",(req, res) =>{
  var name = req.body.name;
  var img = req.body.img;
  var newCamp = {name: name, img: img}
  campgrounds.push(newCamp);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) =>{
  res.render("new");
})

//setting up listening function
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("YelpCamp Server Has Started!");
});
