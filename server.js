var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "/static")));
app.use(session({secret: "codingdojorocks"}));
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.get('/', function(req, res){
   if(!req.session.guess){
       req.session.guess = "noguess";
   }
   if(!req.session.answer){
       req.session.answer = Math.floor(Math.random()*100)+1;
   }
    res.render("index",{guess:req.session.guess, answer:req.session.answer});
});

app.post("/processGuess", function(req, res){
    req.session.guess = req.body.guess;
    res.redirect("/");
})

app.get("/reset", function(req,res){
    req.session.destroy();
    res.redirect("/");
})


app.listen(8000,function(){
    console.log("listening on port 8000");
})