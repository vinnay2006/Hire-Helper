 import { useState } from "react";
import HelperContext from "./HelperContext";
 const HelperState=(props)=>{
   const helpersInitial=[]
   const historyInitial=[]
   const presentInitial=[]
const [helpers,setHelpers]=useState(helpersInitial)
const [history,setHistory]=useState(historyInitial)
const [present,setPresent]=useState(presentInitial)
const getHelpers=async()=>{
   const response=await fetch("http://localhost:5000/api/HelperAuth/gethelpers",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":localStorage.getItem("token")
      }
   });
const json=await response.json()
  console.log("Fetched helpers from backend:", json)
setHelpers(json)
}
const userHistory=async()=>{
   const response=await fetch("http://localhost:5000/api/auth/userHistory",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":localStorage.getItem("token")
      }
   });
const json=await response.json()
setHistory(json)
}
const userPresent=async()=>{
   const response=await fetch("http://localhost:5000/api/auth/userPresent",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":localStorage.getItem("token")
      }
   });
const json=await response.json()
setPresent(json)
}
 return(
 
    <HelperContext.Provider value={{helpers,setHelpers,getHelpers,history,setHistory,userHistory,present,setPresent,userPresent}}>
        {props.children}
    </HelperContext.Provider>
 )
 }
export default HelperState;