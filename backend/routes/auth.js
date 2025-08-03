const express=require("express")
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs')
var jwt=require("jsonwebtoken")
var fetchuser=require('../middleware/fetchuser')
const JWT_SECRET="vinayisagooddebator"
//creating a new user using new request that hits end point /api/auth/createuser
router.post('/createuser',  [
    body('name')
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    
    body('email')
      .isEmail().withMessage('Invalid email'),

    body('password')
      .isLength({ min: 8 }).withMessage('password must be of atleast length 8 '),

      body('mobile_no')
      .isLength({ min: 10 }).withMessage('mobile no must be of length 10 ')
  ], async(req,res)=>{
   const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 try {
    const{name,email,password,mobile_no,location}=req.body;
  const salt= await bcrypt.genSalt(10);
  secPass= await bcrypt.hash(password,salt);
   const existinguser= await User.findOne({email:req.body.email})
   if(existinguser){
     return res.status(400).json({ message:"email not available try login with this email not signUp" }); 
   }
   const user = new User({ name,email,password:secPass,mobile_no,location});
    await user.save();  
      const data={
    user:{
        id:user.id,
        location:user.location
    }
   } 
   const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken});    
 } catch (error) {
     return res.status(400).json({ error:error.message });
 }
 
})
//creating  a user with  an endpoint /api/auth/login
router.post('/login',  [
    body('email')
      .isEmail().withMessage('Invalid email'),

    body('password')
      .isLength({ min: 8 }).withMessage('password must be of atleast length 8 ')

  ], async (req,res)=>{
     const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 const{email,password}=req.body
   
  
try{
    let user=await User.findOne({email});
  if(!user){
    return res.status(400).json({ message:"try with correct login credentials" });
  }

const passkeycomp= await  bcrypt.compare(password,user.password);
if(!passkeycomp){
    return res.status(400).json({ message:"try with correct login credentials" });
}
 const data={
   user:{
        id:user.id,
        location:user.location
    }
   } 
   const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken});  


}catch(error){
  return res.status(400).json({ errors: errors.array() });
}


})
router.post('/getuser',fetchuser, async(req,res)=>{
   try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
  })



module.exports=router