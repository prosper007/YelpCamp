var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
            {name: "Salmon Creek", image: "https://farm4.staticflickr.com/3278/2671754433_f56fd9b026.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3042/2671765705_019ec5915f.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1489/26610489731_9cc1f1d78d.jpg"},
    ];
    
    res.render("campgrounds", {campgrounds: campgrounds});
        
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});