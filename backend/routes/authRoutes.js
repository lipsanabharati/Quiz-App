const express=require("express"); //imports the express library 
const router=express.Router();//imports the express router
const {register}=require("../controllers/authController") //importing only the register object
const {login}=require("../controllers/authController"); //importing only login object

router.post("/register",register);
router.post("/login",login);

module.exports=router;
