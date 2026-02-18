const jwt=require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    try{
        //get token from headers
        const token=req.headers.authorization?.split(" ")[1]; //bearer token is split into only the code

        //if there is no token
        if(!token)
        {
            return res.status(401).json({
                message:"no token,authorization denied"
            })
        }

        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user info to req.user
        // decoded contains user id and email
        req.user=decoded;

        next();
    }
    catch(err)
    {
        console.error(err);
        res.status(401).json({
            message:"token is not valid"
        })
    }
};

module.exports=authMiddleware;