var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 3000
var hostIp = "192.168.0.121"

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


app.get("/scanresult.html/:id", (req, res, next) => {
    console.log("GET recieved at all User info")
    var sql = "select * from patienttbl where id = ?"
    var params = [req.params.id]//[md5(req.params.id)]
    db.get(sql, params, (err, row) => {
        if (err) {
          //res.status(404).json({"error":err.message});
          console.log("Error recieved at no user")
          //res.status(200).redirect('scanresult.html');
          //return;
        }
        if(!row){
            console.log("No rows were received")
            res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <header>
                        <title>
                            Record not found
                        </title>
                    </header>
                    <link rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            
                     <link rel="stylesheet" href="http://${hostIp}:${HTTP_PORT}/fab.css">
            
                </head>
                <body>
                    <h1>No patient record matches the fingerprint<h1>
                        <div class="fab-container">
                            <div class="fab-icon-holder">
                                <i class="fa fa-bars"></i>
                            </div>
                            <ul class="fab-options">
                                <li>
                                    <span class="fab-label">Home</span>
                                    <div class="fab-icon-holder">
                                        <i class="fa fa-bars" onclick="homePage()"></i>
                                    </div>
                                </li>
                                <li>
                                    <span class="fab-label">Scan</span>
                                    <div class="fab-icon-holder">
                                        <i class="fa fa-bars" onclick="startScan()"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <footer>
                            Developed by Osala c2020
                            <n>jashonosala@gmail.com</n>
                        </footer>
                </body>
                <script src="http://${hostIp}:${HTTP_PORT}/user.js"></script>    
            </html>
                        `);
            res.end()
        }
        else{
       // res.setHeader('Content-Type','html')
       //Patient result form
        //#region HTML patient data
       res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>
                    New patient
                </title>
                <header hidden>
                    <h1>HEALTH CENTER</h1>
                </header>
            </head>
            <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <link href="http://${hostIp}:${HTTP_PORT}/scanresults.css" rel="stylesheet"/>
            <link href="http://${hostIp}:${HTTP_PORT}/actionbutton.css" rel="stylesheet"/>
            <body>
                <div id="workarea">
                    <div id="letterhead" >
                        <h2>
                            HEALTH CENTER
                        </h2>
                        <p>Patient data</p>
                    </div>
                    <section id="patientData">
                        <section class="patientinfo">
                            <h3>First name</h3>
                            <p>${row.firstName}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Middle name</h3>
                            <p>${row.middleName}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Last name</h3>
                            <p>${row.lastName}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Date of birth</h3>
                            <p>${row.dateofBirth}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Name of parent</h3>
                            <p>${row.nameofParent}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Tel</h3>
                            <p>${row.phoneNumber}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Email</h3>
                            <p>${row.emailAddress}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Place of birth</h3>
                            <p>${row.placeofBirth}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Blood group</h3>
                            <p>${row.bloodGroup}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Date of visit</h3>
                            <p>${row.dateofVisit}</p> 
                        </section>
                        <section class="patientinfo">
                            <h3>Fingerprint</h3>
                            <p>${row.id}</p> 
                        </section>
                        
                        
                    </section>
                    <section id="rpt">
                            <h3 style="text-align:center;clear:both;">Docter-Report</h3>
                            <p style="width:15cm;height:6cm;">${row.report}</p> 
                        </section>
                    </div>
                    <div class="fab-container">
                <div class="fab-icon-holder">
                    <i class="fa fa-bars"></i>
                </div>
                <ul class="fab-options">
                    <li>
                        <span class="fab-label">Close</span>
                        <div class="fab-icon-holder">
                            <i class="fa fa-bars" onclick="homePage()"></i>
                        </div>
                    </li>
                    <li>
                        <span class="fab-label">Email</span>
                        <div class="fab-icon-holder">
                            <i class="fa fa-bars"></i>
                        </div>
                    </li>
                    <li>
                        <span class="fab-label">Home</span>
                        <div class="fab-icon-holder">
                            <i class="fa fa-bars"></i>
                        </div>
                    </li>
                    <li>
                        <span class="fab-label">Exit</span>
                        <div class="fab-icon-holder">
                            <i class="fa fa-bars"></i>
                        </div>
                    </li>
                </ul>
            </div>
                    <footer>
                        Developed by Osala c2020
                        <n>jashonosala@gmail.com</n>
                    </footer>
                    <script src="http://${hostIp}:${HTTP_PORT}/user.js"></script>
                    <!--script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>-->
                </body>
           </html>
            
        `)
        //#endregion
            }
        // json({
        //     "message":"success",
        //     "data":row
        // })
      });
});

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

app.post("/scan", (req,res,next) => {
    console.log("SCANNING REQUEST RECIEVED") 
    var id = [md5(req.body.scanWindow)];
     res.status(200).redirect(`/scanresult.html/${id}`);
 });













 
/*
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
*/





/*
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

*/