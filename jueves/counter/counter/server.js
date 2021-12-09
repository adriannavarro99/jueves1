var express = require("express");
var session = require("express-session");


var app = express();


app.use(express.static(__dirname + "/static"));
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    
}))

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    if(request.session.count == null){
        request.session.count = 0;
    }
    else{
        request.session.count += 1;
    }
   response.render("counter",{count:request.session.count})
})


app.listen(8000, function() {
  console.log("port 8000");
})

app.get("/reset", function(request,response){
    request.session.count = null;
    response.redirect("/");
})

app.get("/add", function(request,response){
    request.session.count += 1;
    response.redirect("/");
})

