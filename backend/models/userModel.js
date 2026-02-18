//folder models consists of actual mysql queries
const db= require("../config/config"); //imports db:an object that has established connection with database in config.js

//check if user exists
exports.findByEmail=(email,callback)=>{//callback is any function to call after query is executed
    const sql="SELECT * from users WHERE email=?";//"?" mark to prevent sql injections
    db.query(sql,[email],(err,results)=>{
        if(err) return callback(err);//sends error to callback function
        callback(null,results[0]);//null is placed first to show that it has no error 
        //convention is callback(err,data)
    });
};

//create new user
exports.createUser=(user,callback)=>{
    const sql="INSERT INTO users (username,email,password_hash) VALUES(?,?,?)";
    db.query(
        sql,
        [user.username,user.email,user.password_hash],
        callback
    );
};