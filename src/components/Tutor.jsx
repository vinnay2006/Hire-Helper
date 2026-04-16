import { FaPencilAlt, FaBitcoin, FaHammer } from "react-icons/fa";

import './Tutor.css';
import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
import {useNavigate,useLocation}from "react-router-dom"
function Tutor(props) {
  console.log(props)
  const navigate=useNavigate();
    const location = useLocation();
  const { category } = location.state || {};
  const context=useContext(HelperContext);
  const {helpers,getHelpers}=context;
    useEffect(() => {
    getHelpers();
  }, []);
  
  return (

      <>
      <div className="background-icons">
  
  <div className="icon"><FaPencilAlt /></div>
  <div className="icon"><FaBitcoin /></div>
  <div className="icon"><FaHammer /></div>
  <div className="icon"><FaPencilAlt /></div>
</div>

       <div style={{marginTop:"15px"}}><h3 style={{ fontFamily: "Montserrat, sans-serif" }}>{category?.toUpperCase()}</h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {helpers.filter(helper => helper.category?.toLowerCase() ===category?.toLowerCase()&&helper.available===true).map((helper)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem" ,textAlign:"left",textSizeAdjust:"3px",}}>
  <img src="https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h6 className="card-title">Name :{helper.name}</h6><br/>
    <h6 className="card-title">Email :{helper.email}</h6><br/>
    <h6 className="card-title">Mobile_N0:{helper.mobile_no}</h6>
     <h6 className="card-title">Experience(years):{helper.experience}</h6>
          <h6 className="card-title">Charges($ per hour):{helper.charges}</h6>
    <p className="card-text" style={{textAlign:"left"}}>
    </p>
  
   <a
  href="/hire"
  onClick={async (e) => {
    const userwill=prompt("IF you want to hire a user type 'yes' otherwise  type 'NO'")
   if(userwill==="yes")
   {
    e.preventDefault();
console.log(sessionStorage.getItem('token'))
    try {
      const response = await fetch("http://localhost:5000/api/auth/addActivePresent", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          helper:helper._id,
          name: helper.name,
          email: helper.email,
          mobile_no: helper.mobile_no,
          category: helper.category,
          location: helper.location,
          charges: helper.charges,
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
 <button className="btn btn-primary mx-1">Reviews</button>
  </div> 
</div>
  })}

</div>
  </div>
  </>
  )
}

export default Tutor
