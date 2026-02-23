const bcrypt=require("bcrypt"); //imports password hashing library bcrypt
const User=require("../models/userModel"); //imports user model(functions for user related tasks)
const jwt=require("jsonwebtoken");

exports.register=(req,res)=>{

    const {username,email,password_hash}=req.body; //reads data from req body

    //form validation
    if(!username||!email||!password_hash){
        return res.status(400).json({
            message:"All fields are required"
        });
    }

    //to check if user already exists
    User.findByEmail(email,(err,result)=>{
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                message:"database error"
            })
        }
        if(result && result.length>0)
        {
            return res.status(400).json({
                message:"user already exists",
            });
        }
        else
        {
            //hash password
            const hashedPassword=bcrypt.hashSync(password_hash,10);

            //create user
            User.createUser(
                {username,email,password_hash:hashedPassword},
                (err)=>
                {
                    if(err)
                    {  
                        console.log(err);
                       return res.status(500).json({
                        message:"Database error",
                       });
                    }
                    else
                    {
                        //send success response
                        return res.status(201).json({
                        message:"user created successfully",
                        });
                    }
                }
            );
        }
    });

}


exports.login=(req,res)=>{

    //get data from client
    //this code is the same as writing const email=req.body.email
    const {email,password_hash}=req.body;

    //validate input
    if(!email||!password_hash)
    {
        return res.status(400).json({
            message:"email and password is required"
        });
    }

    //find user by email
    User.findByEmail(email,(err,user)=>{
        
        //database error
        if(err)
        {
            console.log(err);
            return res.status(500).json({
                message:"database error"
            })
        }
        
        //no user found
        if(!user)
        {
            return res.status(401).json({
                message:"invalid credentials"
            })
        }

        //compare password with hashed password
        const isMatch=bcrypt.compareSync(password_hash,user.password_hash);

        //did not match
        if(!isMatch)
        {
            return res.status(401).json({
                message:"invalid credentials"
            }) 
        }

        //if there is a match,create unique jwt token
        const token=jwt.sign(
            { id:user.user_id,email:user.email },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        //send success response
        res.status(200).json({
            message:"login successfull",
            token,
            user:{
                id:user.user_id,
                username:user.username,
                email:user.email,
            },
        });
    });
};