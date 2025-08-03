 import { useState } from "react";
import HelperContext from "./HelperContext";
 const HelperState=(props)=>{
   const helpersInitial=[]
const [helpers,setHelpers]=useState(helpersInitial)
const getHelpers=async()=>{
   const response=await fetch("http://localhost:5000/api/HelperAuth/gethelpers",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":localStorage.getItem("token")
      }
   });
const json=await response.json()
setHelpers(json)
}
 return(
 
    <HelperContext.Provider value={{helpers,setHelpers,getHelpers}}>
        {props.children}
    </HelperContext.Provider>
 )
 }
export default HelperState;