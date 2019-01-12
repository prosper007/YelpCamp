var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3278/2671754433_f56fd9b026.jpg"},
            {name: "Stoner's Escape", image: "https://farm4.staticflickr.com/3042/2671765705_019ec5915f.jpg"},
            {name: "Sketchy People Camp", image: "https://farm2.staticflickr.com/1489/26610489731_9cc1f1d78d.jpg"},
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3278/2671754433_f56fd9b026.jpg"},
            {name: "Stoner's Escape", image: "https://farm4.staticflickr.com/3042/2671765705_019ec5915f.jpg"},
            {name: "Sketchy People Camp", image: "https://farm2.staticflickr.com/1489/26610489731_9cc1f1d78d.jpg"},
    ];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image, image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});