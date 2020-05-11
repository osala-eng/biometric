var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 3000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/api/users", (req, res, next) => {
    var sql = "select * from patienttbl"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});


app.get("/data", (req, res, next) => {
    console.log("GET recieved at all User info")
    var sql = "select * from patienttbl"
    var params = []//[md5(req.params.id)]
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.send(row)
        // json({
        //     "message":"success",
        //     "data":row
        // })
      });
});


// app.post("/api/user/", (req, res, next) => {
//     var errors=[]
//     if (!req.body.password){
//         errors.push("No password specified");
//     }
//     if (!req.body.email){
//         errors.push("No email specified");
//     }
//     if (errors.length){
//         res.status(400).json({"error":errors.join(",")});
//         return;
//     }
//     var data = {
//         name: req.body.name,
//         email: req.body.email,
//         password : md5(req.body.password)
//     }
//     var sql ='INSERT INTO patienttbl (name, email, password) VALUES (?,?,?)'
//     var params =[data.name, data.email, data.password]
//     db.run(sql, params, function (err, result) {
//         if (err){
//             res.status(400).json({"error": err.message})
//             return;
//         }
//         res.json({
//             "message": "success",
//             "data": data,
//             "id" : this.lastID
//         })
//     });
// })

app.post("/data", (req,res,next) => {
    console.log("POST request recieved") 

    var sql = "INSERT INTO patienttbl VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
    var params = [md5(req.body.uniqueID),req.body.firstName,req.body.secondName,req.body.lastName,
        req.body.dateofBirth,req.body.nameofParent,req.body.phoneNumber,req.body.emailAddress,
        req.body.placeofBirth,req.body.bloodGroup,req.body.dateofVisit,req.body.doctorReport]
    db.run(sql,params,function(err){
            if(err){
                console.log(`Error: ${err}`);
            }
            else{
                res.status(200).redirect('main.html');
            }
        });
});





// app.patch("/api/user/:id", (req, res, next) => {
//     var data = {
//         name: req.body.name,
//         email: req.body.email,
//         password : req.body.password ? md5(req.body.password) : undefined
//     }
//     db.run(
//         `UPDATE user set 
//            name = coalesce(?,name), 
//            email = COALESCE(?,email), 
//            password = coalesce(?,password) 
//            WHERE id = ?`,
//         [data.name, data.email, data.password, req.params.id],
//         (err, result) => {
//             if (err){
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({
//                 message: "success",
//                 data: data
//             })
//     });
// })


// app.delete("/api/user/:id", (req, res, next) => {
//     db.run(
//         'DELETE FROM user WHERE id = ?',
//         req.params.id,
//         function (err, result) {
//             if (err){
//                 res.status(400).json({"error": res.message})
//                 return;
//             }
//             res.json({"message":"deleted", rows: this.changes})
//     });
// })


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

