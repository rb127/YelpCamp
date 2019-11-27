const mongoose = require("mongoose");
const Comment = require("./models/comments");
const Campground = require("./models/campground");

const data = [
  {
    name: "Yosemite Park",
    img:
      "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg",
    description:
      "Yosemite Park is out of this world! Never seen anything like it."
  },
  {
    name: "Salmon Creek",
    img:
      "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg",
    description: "Salmon Creek is the perfect place to chill"
  },
  {
    name: "Devil's Spot",
    img:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description:
      "Devil's Spot is one place where you can be alone with your thoughts, look up at the sky and ponder life's mysteries"
  }
  //   {
  //     name: "Yosemite Park",
  //     img:
  //       "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"
  //   },
  //   {
  //     name: "Salmon Creek",
  //     img:
  //       "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg"
  //   },
  //   {
  //     name: "Devil's Spot",
  //     img:
  //       "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  //   },
  //   {
  //     name: "Yosemite Park",
  //     img:
  //       "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/yosemite-camping.jpg"
  //   },
  //   {
  //     name: "Salmon Creek",
  //     img:
  //       "https://www.cleverhunters.com/wp-content/uploads/2018/11/Things_To_Do_While_Camping_At_Night.jpg"
  //   },
  //   {
  //     name: "Devil's Spot",
  //     img:
  //       "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  //   }
];

seedDb = () => {
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds");
      Comment.deleteMany({}, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  }).then(() => {
    data.map(seed => {
      Campground.create(seed)
        .then(camp => {
          //add comment
          console.log("added campground");
          Comment.create({
            text: "Amazing place to camp out with friends, had the best time!",
            author: "Rohit"
          })
            .then(comment => {
              camp.comments.push(comment);
              camp.save();
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
};

module.exports = seedDb;
