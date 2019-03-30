var express = require("express"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router();



//root route
router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES

//REGISTER form
router.get("/register", function(req, res) {
    res.render("register");
});


//sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN form
router.get("/login", function(req, res) {
    res.render("login");
});


//handle login form logic
router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {
    
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
}); 

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;