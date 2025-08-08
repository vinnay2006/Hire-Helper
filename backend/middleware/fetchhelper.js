var jwt=require('jsonwebtoken');
const JWT_SECRET="vinayisagooddebator";
const fetchuser=(req,res,next)=>{
const token=req.header('auth-token');
if(!token){
    res.send(401).send({error:"please authenticate using a valid token"});
}
try {
 const data =jwt.verify(token,JWT_SECRET);
req.helper=data.helper;
next();   
} catch (error) {
  res.status(401).send({error:"please authenticate using a valid token"});   
}

}
module.exports=fetchuser;