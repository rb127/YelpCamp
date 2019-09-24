const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var campgrounds = [
  {name: "Yosemite Park", img: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"},
  {name: "Salmon Creek", img: "https://www.todaysparent.com/wp-content/uploads/2018/05/all-the-best-family-campgrounds-in-canada4.jpg"},
  {name: "Devil's Spot", img: "https://images.haarets.co.il/image/upload/w_1496,q_auto,c_fill,f_auto/fl_any_format.preserve_transparency.progressive:none/v1557258266/1.7214604.3040260106.jpg"}
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
