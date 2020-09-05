var express=require("express");
var app= express();
var mongoose=require("mongoose");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/guiderv1",{ useNewUrlParser: true,useUnifiedTopology: true });


var topicSchema =new mongoose.Schema({
    name: String,
    img: String,
    des1: String,
    websites: [],
    courses: [],
    channels: [],
    contests: [],
    testbooks: [],
    des2: String
});

// var Topic =mongoose.model("cse",topicSchema);
// var Topic1=mongoose.model("placement",topicSchema);
app.get("/",function(req,res){
    res.render("home.ejs");
});
app.get("/topicslist",function(req,res){
    res.render("topicslist.ejs");
});
app.get("/:branch",function(req,res){
   var par=req.params.branch;
   var topic =mongoose.model(par,topicSchema);
   topic.find({},function(err,top){
       if(err){
           console.log(err);
       }else{
        res.render("topics.ejs",{topics: top,T:par});
       }
   });
});
app.get("/:branch/:id",function(req,res){
    var branch=req.params.branch;
    var id=req.params.id;
    var topic =mongoose.model(branch,topicSchema);
    topic.find({_id:id},function(err,top){
        if(err){
            console.log(err);
        }else{
            res.render("topic.ejs",{id:top});
        }
    });
});
app.get("*",function(){
    res.send("some thing went wrong");
});
app.listen(3000,function(){
    console.log("guider server started");
});





