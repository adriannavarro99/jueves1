const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + "/views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'root'}));

status = 'none';
context = {};

app.get('/', function(req, res){
    if(req.session.ainumber == undefined){
        console.log("New Game");
        req.session.ainumber = Math.floor(Math.random()*100)+1;
        status = 'nada';
        context = {status: status};
    } else {
        
        context = {status: status};
    }
    res.render('index', context);
});

app.post('/guess', function(req, res){
    console.log(req.body);
    console.log(req.session.ainumber);

    if(req.body.guess > req.session.ainumber){
        status = 'alto';
        console.log("Status = ", status);
    }
    else if(req.body.guess < req.session.ainumber){
        status = 'bajo';
        
    }
    else if(req.body.guess == req.session.ainumber){
        status = 'gano';
        console.log('gano');
    }
    res.redirect('/');
});

app.post('/reset', function(req, res){
    req.session.ainumber = undefined;
    res.redirect('/');
});


app.listen( 8080, function(){
    console.log('This server is running in port 8080');
});
