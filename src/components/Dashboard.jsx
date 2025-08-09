import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
import {useNavigate,Link} from "react-router-dom"
function Dashboard() {
  const handleCall=()=>{
 
    const roomId= prompt("enter the room no to start a video call with the helper");
    console.log(roomId);
    if(roomId){
      navigate(`/callroom/${roomId}`);
    }
  }
  const navigate=useNavigate();
  const context=useContext(HelperContext);
  const {history,userHistory,present,userPresent}=context;
    useEffect(() => {
    userHistory();
    userPresent();
  }, []);
  const handleDeactivate=async(id)=>{
     try {
      const response = await fetch(`http://localhost:5000/api/auth/deleteActiveUser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  localStorage.getItem('token'),
        },
      
      });

      const result = await response.json();

      if (response.ok) {
       await userPresent();
       await userHistory();
      } else {
        alert('Failed to deactivate current helper : ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error while Deactivating helper.');
    }
  }
  return (

      <>
      <div style={{marginTop:"15px"}}><h3><b>SEE YOUR  ACTIVE HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {present.map((presenties)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem",textAlign :"left"}}>
  <div className="card-body">
    <h6 className="card-title">Name :{presenties.name}</h6><br/>
    <h6 className="card-title">Category :{presenties.category}</h6><br/>
    <h6 className="card-title">Location :{presenties.location}</h6><br/>
    <h6 className="card-title">Date :{presenties.date}</h6>
    <p className="card-text" style={{textAlign:"left"}}>
      <button className='btn btn-primary mx-1 ' onClick={async (e) => {
    const userwill=prompt("Type 'yes' to Stop service from helper otherwise  type 'NO'")
   if(userwill==="yes")
   {
    e.preventDefault();
     console.log(localStorage.getItem('token'))
    try {
      const response = await fetch("http://localhost:5000/api/auth/addhistory", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  localStorage.getItem('token'),
        },
        body: JSON.stringify({
          name: presenties.name,
          email: presenties.email,
          mobile_no: presenties.mobile_no,
          category: presenties.category,
          location: presenties.location,
        }),
      });

      const result = await response.json();

      if (response.ok) {
       
          await handleDeactivate(presenties._id);
      
      } else {
        alert('Failed to add history: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error while hiring helper.');
    }
  }
  }} > Active</button>
         <button className='btn btn-primary mx-1 ' onClick={handleCall}> CALL</button>
          <button className='btn btn-primary mx-1 ' > PAY</button>
  
    </p>
   

  </div> 
</div>
  })}

</div>
  </div>
  




       <div style={{marginTop:"15px"}}><h3><b>SEE YOUR  PAST HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {history.map((historian)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem",textAlign :"left"}}>
  <div className="card-body">
    <h6 className="card-title">Name :{historian.name}</h6><br/>
    <h6 className="card-title">Category :{historian.category}</h6><br/>
    <h6 className="card-title">Location :{historian.location}</h6><br/>
    <h6 className="card-title">Date :{historian.date}</h6>
    <p className="card-text" style={{textAlign:"left"}}>
      <Link className='btn btn-primary mx-1 ' to="/feedback" > FEEDBACK</Link>
  
    </p>
   

  </div> 
</div>
  })}

</div>
  </div>
  </>
  )
}

export default Dashboard
