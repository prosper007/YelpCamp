var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware"),
    router      = express.Router();


//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
    
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: name,
        image: image, 
        description:desc,
        author: author
    };
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
           req.flash("error", "Error creating campground");
           res.redirect("/campgrounds");
       } else{
           req.flash("success", "Successfully created campground")
           res.redirect("/campgrounds");
       }
    })
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
           req.flash("error", "Error displaying campground");
           res.redirect("/campgrounds");
       } else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
    
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Error editing campground");
            res.redirect("back");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
            console.log(err);
            req.flash("error", "Error updating campground");
            res.redirect("/campgrounds/"+req.params.id);
       } else{
           req.flash("success", "Successfully updated campground");
           res.redirect("/campgrounds/"+req.params.id);
       }
   });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res){
   Campground.findOneAndDelete(req.params.id, function(err,removedCampground){
       if(err){
           console.log(err)
           req.flash("error", "Error deleting campground");
           res.redirect("/campgrounds");
       } else{
           Comment.deleteMany({_id: {$in: removedCampground.comments}}, function(err){
               if(err){
                   console.log(err);
                   res.redirect("/campgrounds");
               } else{
                   req.flash("success", "Successfully deleted campground");
                   res.redirect("/campgrounds");
               }
           })
           
       }
   });
});

module.exports = router;
