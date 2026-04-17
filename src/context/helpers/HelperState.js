 import { useState } from "react";
import HelperContext from "./HelperContext";
 const HelperState=(props)=>{
   const helpersInitial=[]
   const historyInitial=[]
   const presentInitial=[]
   const HelperpresentInitial=[]
const [helpers,setHelpers]=useState(helpersInitial)
const [history,setHistory]=useState(historyInitial)
const [present,setPresent]=useState(presentInitial)
const [Helperpresent,setHelperpresent]=useState(HelperpresentInitial)
const getHelpers=async()=>{
   const response=await fetch("https://hire-helper-3.onrender.com/api/HelperAuth/gethelpers",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
  console.log("Fetched helpers from backend:", json)
setHelpers(json)
}
const userHistory=async()=>{
   const response=await fetch("https://hire-helper-3.onrender.com/api/auth/userHistory",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
setHistory(json)
}
const userPresent=async()=>{
   const response=await fetch("https://hire-helper-3.onrender.com/api/auth/userPresent",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
setPresent(json)
}
const HelperPresent=async()=>{
   const response=await fetch("https://hire-helper-3.onrender.com/api/HelperAuth/HelperPresent",{
      method:"GET",
      headers:{
         "Content-Type":"application/json",
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
setHelperpresent(json)
}
 return(
 
    <HelperContext.Provider value={{helpers,setHelpers,getHelpers,history,setHistory,userHistory,present,setPresent,userPresent,HelperPresent,Helperpresent,setHelperpresent}}>
        {props.children}
    </HelperContext.Provider>
 )
 }
export default HelperState;