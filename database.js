var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "dtb.sqlite" 


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE patienttbl ( 
            id VARCHAR PRIMARY KEY,firstName VARCHAR,
            middleName VARCHAR, lastName VARCHAR,
            dateofBirth DATE, nameofParent VARCHAR, 
            phoneNumber INT, emailAddress VARCHAR, 
            placeofBirth VARCHAR, bloodGroup VARCHAR, 
            dateofVisit DATE, report VARCHAR
            )`,(err) => {
        if (err) {
            // Table already created
        }else{
            // Table just created, creating some rows
            var insert = 'INSERT INTO patienttbl VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
                       
            db.run(insert, [md5("XXXXXX"),"John","Doe","Snow","10/12/1991","Parent Name",
            "7827281728","osala@gmail.com","Nairobi","K","10/05/2020",
            "The patient is regaining conciousness and doing ok"])
            
        }
    })  
    }
})


module.exports = db

