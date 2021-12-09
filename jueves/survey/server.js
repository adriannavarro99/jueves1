var express = require("express");
var session = require("express-session");
var bodyParser= require('body-parser')

var app = express();


app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge:60000}
}))

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
 
   response.render("main");
})


app.post("/result", function(request,response){
    

    response.render("result", {info:request.body});
})

app.listen(8080, function() {
    console.log("listening on port 8080");
  })
