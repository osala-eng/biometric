var express = require('express');
var app=express();

app.get('/', function(request, response)
{
    response.send("Server is up and running")
})
app.listene(3000, function(){
    console.log("Server is running on port 3000")
});