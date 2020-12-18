var express=require("express");
var app= express();
var mongoose=require("mongoose");
var request=require("request");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
//mongodb://localhost/guiderv1
mongoose.connect("mongodb+srv://anudeep2731:Anu2731@cluster0.94lnu.mongodb.net/<geeksguider>?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true });
//mongo "mongodb+srv://cluster0.94lnu.mongodb.net/<dbname>" --username anudeep2731


var topicSchema =new mongoose.Schema({
    name: String,
    img: String,
    domain: String,
    history: {},
    usage: {},
    rating:[],
    use:[],
    websites: [],
    courses: [],
    channels: [],
    contests: [],
    textbooks: [],
    des2: String
});

var cse =mongoose.model("cse",topicSchema);
var trendtech=mongoose.model("trendtech",topicSchema);
app.get("/",function(req,res){
    res.render("home.ejs");
});
app.get("/sitemap1.xml",function(req,res){
    res.sendFile(path.format({
        root: '/',
        base: 'sitemap1.xml',
        ext: 'ignored'
      }));
});
app.get("/books/:volid",function(req,res){
    var par=req.params.volid;
    var url="https://www.googleapis.com/books/v1/volumes/"+par;
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var bookdata=JSON.parse(body);
            //console.log(bookdata);
            res.render("books.ejs",{data:bookdata});
        }
    });
});
app.post("/secresults",function(req,res){
    var par=req.body.search;
    var url="https://www.googleapis.com/books/v1/volumes?q="+par;
    request(url,function(error,response,body){
        if(!error&&response.statusCode==200){
            var bookdata=JSON.parse(body);
            //console.log(bookdata);
            res.render("secbooks.ejs",{data:bookdata});
        }
    });
});
app.get("/topicslist",function(req,res){
    res.render("topicslist.ejs");
});
app.get("/placement",function(req,res){
        res.render("placement.ejs");
    });
    app.get("/interq",function(req,res){
        res.render("interq.ejs");
    });
    app.get("/interexp",function(req,res){
        res.render("interexp.ejs");
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
//  app.listen(3000,function(){
//      console.log("guider server started");
//  });
app.listen(process.env.PORT,process.env.IP);





