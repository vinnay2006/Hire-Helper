const express=require("express")
const Helper=require("../models/Helper")
const User = require("../models/User");
const Present = require("../models/Present");
const { body, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs')
var jwt=require("jsonwebtoken")
var fetchuser=require('../middleware/fetchuser')
var fetchhelper=require('../middleware/fetchhelper')
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
    const{name,email,password,category,experience,charges,mobile_no,location}=req.body;
  const salt= await bcrypt.genSalt(10);
  secPass= await bcrypt.hash(password,salt);
   const existingHelper= await Helper.findOne({email:req.body.email})
   if(existingHelper){
     return res.status(400).json({ message:"email not available try login with this email not signUp" }); 
   }
   const helper = new Helper({ name,email,password:secPass,category,experience,charges,mobile_no,location});
    await helper.save();  
      const data={
    helper:{
        id:helper.id
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
    let helper=await Helper.findOne({email});
  if(!helper){
    return res.status(400).json({ message:"try with correct login credentials" });
  }

const passkeycomp= await  bcrypt.compare(password,helper.password);
if(!passkeycomp){
    return res.status(400).json({ message:"try with correct login credentials" });
}
 const data={
 helper:{
        id:helper.id
    }
   } 
   const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken});  


}catch(error){
  return res.status(400).json({ errors: errors.array(),message:"hell" });
}


})
router.get('/gethelpers', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Logged in user location:", user.location);

    const helpers = await Helper.find({
      location: user.location,
      available: true
    });

    console.log("Fetched helpers:", helpers);

    res.json(helpers);
  } catch (error) {
    console.error("Server error in /gethelpers:", error);
    res.status(500).json({ error: "Server error", details: error.message }); // 👈 JSON response
  }
});


router.get('/getClient',fetchhelper, async(req,res)=>{
   try {
    helperId=req.helper.id;
    const helper=await Helper.findById(helperId).select("-password")
    res.send(helper)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
  })
   router.get('/HelperPresent',fetchhelper, async(req,res)=>{
 const present=await Present.find({helper:req.helper.id}).populate("user", "name email mobile_no location"); 
 res.json(present)
  })

  router.put('/updateDetails/:id', fetchhelper, async (req, res) => {
    const { name, email, mobile_no, location,experience,charges,available } = req.body;
    const newDetails = {};
  
    if (name) newDetails.name = name;
    if (email) newDetails.email = email;
    if (location) newDetails.location = location;
    if (mobile_no) newDetails.mobile_no = mobile_no;
   if (experience) newDetails.experience = experience;
    if (charges) newDetails.charges = charges;
       if (available) newDetails.available = available;
    let client = await Helper.findById(req.params.id);
    if (!client) {
      return res.status(404).send("not found");
    }
  
  
    if (client.id.toString() !== req.helper.id) {
      return res.status(401).send("not allowed");
    }
  
    client = await Helper.findByIdAndUpdate(
      req.params.id,
      { $set: newDetails },
      { new: true }
    );
    
    res.json({ client });
  });
module.exports=router