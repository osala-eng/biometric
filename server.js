var express = require('express');
var app=express();
var  sqlite3 = require('sqlite3');
var db  = new sqlite3.Database('datastore.db');
var bodyParser = require('body-parser');

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended:false}));

//route
app.get('/', function(request, response)
{
    response.send('Server is up and running')
});

app.get('/',function(request,response){
    console.log("GET request received")
});

app.post('/',function(request,response){
    console.log("POST request recieved")
    db.run('INSERT INTO patienttbl VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
        [request.body.uniqueID,request.body.firstName,request.body.secondName,request.body.lastName,
            request.body.dateofBirth,request.body.nameofParent,request.body.phoneNumber,request.body.emailAddress,
            request.body.placeofBirth,request.body.bloodGroup,request.body.dateofVisit,request.body.doctorReport],
        function(err){
            if(err){
                console.log(`Error: ${err}`);
            }
            else{
                response.status(200).redirect('main.html');
            }});
});



app.listen(3000, function(){
    console.log("Server is running on port 3000")
});