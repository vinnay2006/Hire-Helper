const express=require("express")
const User=require("../models/User")
const History=require("../models/History")
const Present=require("../models/Present")
const { body, validationResult } = require('express-validator');
const router=express.Router();
const bcrypt=require('bcryptjs')
var jwt=require("jsonwebtoken")
var fetchuser=require('../middleware/fetchuser');
const { UNSAFE_createBrowserHistory } = require("react-router-dom");
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
        id:user.id
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
router.get('/getClient',fetchuser, async(req,res)=>{
   try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
  })
  //RELATED TO USER HISTORY TO SHOW IN ITS PERSONAL DASHBOARD
  router.post('/addhistory',fetchuser,async(req,res)=>{
try {
 const {name,email,mobile_no,category,location} =req.body;
 const history=new History({
  name,email,mobile_no,category,location,user:req.user.id
 })
 const savedHistory=await history.save();
 res.json(savedHistory)
} catch (error) {
    res.status(500).send("Internal Server Error");
}
  })
router.get('/UserHistory',fetchuser, async(req,res)=>{
 const history=await History.find({user:req.user.id});
 res.json(history)
  })
//realted to active present of user
  router.post('/addActivePresent',fetchuser,async(req,res)=>{
try {
 const {name,email,mobile_no,category,location} =req.body;
 const present=new Present({
  name,email,mobile_no,category,location,user:req.user.id
 })
 const savedPresent=await present.save();
 res.json(savedPresent)
} catch (error) {
    res.status(500).send("Internal Server Error");
}
  })

  router.get('/UserPresent',fetchuser, async(req,res)=>{
 const present=await Present.find({user:req.user.id});
 res.json(present)
  })
 // DELETE /api/auth/deleteActiveUser/:id
router.delete('/deleteActiveUser/:id', fetchuser, async (req, res) => {
  try {
    // Find the document with matching ID and owned by this user
    const present = await Present.findOne({ _id: req.params.id, user: req.user.id });

if (!present) {
  return res.status(404).json({ success: false, message: "Not found or unauthorized" });
}


    await Present.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Present deleted successfully", deleted: present });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put('/updateDetails/:id', fetchuser, async (req, res) => {
  const { name, email, mobile_no, location } = req.body;
  const newDetails = {};

  if (name) newDetails.name = name;
  if (email) newDetails.email = email;
  if (location) newDetails.location = location;
  if (mobile_no) newDetails.mobile_no = mobile_no;

  let client = await User.findById(req.params.id);
  if (!client) {
    return res.status(404).send("not found");
  }


  if (client.id.toString() !== req.user.id) {
    return res.status(401).send("not allowed");
  }

  client = await User.findByIdAndUpdate(
    req.params.id,
    { $set: newDetails },
    { new: true }
  );
  
  res.json({ client });
});

/* creating a  delete request for api/notes/deletenote
router.delete('/delete/:id', fetchuser, async (req, res) => {

 
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("not found")}
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  note=await Notes.findByIdAndDelete(req.params.id);
  res.json({"success":"Note has been deleted",note:note});
});
*/

module.exports=router