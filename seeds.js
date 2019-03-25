var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Stoner's Bask",
            image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg",
            description: "Lovely, peaceful space where you can chill and get high"
        },
        {
            name: "Hippies' Den",
            image: "https://www.planetware.com/photos-large/USUT/utah-zion-national-park-camping-south-campground.jpg",
            description: "One of the few cool spots that hasn't become cool yet. Hippy gold"
        },
        {
            name: "GossipGround",
            image: "https://static1.squarespace.com/static/5a01c0b0017db2a719c25b23/5a3fd4358165f5d70b754a0c/5a3fd6610852297f08180edc/1514288612010/Sunburst-Campground.jpg",
            description: "Enjoy being in everybody's business? Well nobody can escape your nosy ears on this ground"
        },
        {
            name: "Mystic Coven",
            image: "https://bearlake.org/wp-content/uploads/cache/images/garden-city-logan-campgrounds/garden-city-logan-campgrounds-987998613.jpg",
            description: "Not for the faint of heart or weak of magic"
        }
    ]
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(data);
                    } else{
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "Wow",
                                author: "Owen Wilson"
                            }, function(err, comment){
                               if(err){
                                   console.log(err);
                               } else{
                                  campground.comments.push(comment);
                                  campground.save();
                                  console.log("Created new comment");
                               }
                            });
                    }
                })
            });
        }
    });  
}

module.exports = seedDB;
