import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
import {useNavigate}from "react-router-dom"
function Tutor() {
  const navigate=useNavigate();
  const context=useContext(HelperContext);
  const {helpers,getHelpers}=context;
    useEffect(() => {
    getHelpers();
  }, [getHelpers]);
  
  return (

      <>
       <div style={{marginTop:"15px"}}><h3><b>CHOOSE CATEGORY FOR HELP</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {helpers.map((helper)=>{
  return <div className="card col-md-3 me-5" style={{ width: "15rem" }}>
  <img src="" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{helper.name}</h5><br/>
    <h5 className="card-title">{helper.email}</h5><br/>
    <h5 className="card-title">{helper.mobile_no}</h5>
    <p className="card-text" style={{textAlign:"left"}}>
  
    </p>
   <a
  href="/hire"
  onClick={async (e) => {
    const userwill=prompt("IF you want to hire a user type 'yes' otherwise  type 'NO'")
   if(userwill==="yes")
   {
    e.preventDefault();
console.log(localStorage.getItem('token'))
    try {
      const response = await fetch('http://localhost:5000/api/auth/addhistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  localStorage.getItem('token'),
        },
        body: JSON.stringify({
          name: helper.name,
          email: helper.email,
          mobile_no: helper.mobile_no,
          category: helper.category,
          location: helper.location,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/dashboard")
      } else {
        alert('Failed to add history: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Server error while hiring helper.');
    }
  }
  }}
  className="btn btn-primary"
>
  HIRE_NOW
</a>

  </div> 
</div>
  })}

</div>
  </div>
  </>
  )
}

export default Tutor
