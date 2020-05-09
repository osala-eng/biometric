var express = require('express');
var app=express();
var  sqlite3 = require('sqlite3');
var db = new sqlite3.Database('patienttbl');
var bodyParser = require('body-paser');

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.get('/', function(request, response)
{
    response.send('Server is up and running')
});

app.get('/',function(request,response){
    console.log("Get request recieved")
});

app.post('/',function(request,response){
    console.log("Post request received")
});

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});