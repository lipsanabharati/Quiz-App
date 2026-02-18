const mysql=require("mysql2"); //imports the mysql2 library

//create connection with database qsystem
const db=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"qsystem",
    }
);

//catch any error
db.connect((err)=>{
    if(err)
    {
        throw err;
    }
    console.log("mysql connected")
});


module.exports=db;

