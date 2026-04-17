import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
import {useNavigate,Link} from "react-router-dom"
function Dashboard() {
  
  const currency="INR";
  const receiptId="qwsaq1";
  const paymentHandler=async (val,e)=>{
 const response=await fetch("https://hire-helper-3.onrender.com/order",{
  method:"POST",
  body:JSON.stringify({
    amount:val,
    currency,
    receipt:receiptId,

  }),
  headers:{
    "Content-Type":"application/json",
  },
 });
 const order= await response.json();
 console.log(order);
  var options = {
      key: "rzp_test_RC23WgCKYDDbow", // Replace with your Razorpay Key ID
      amount:val, //amount is in paise 
      currency,
      name: "My Store",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //it will be Replaced with order_id from backend
      handler: async function (response) {
   const body={
    ...response,
   };
const validateRes=await fetch("https://hire-helper-3.onrender.com/order/validate",{
  method:"POST",
  body:JSON.stringify(body),
  headers:{
    "Content-Type":"application/json",
  },

}
);
const jsonRes=await validateRes.json();
console.log(jsonRes);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Demo Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1=new window.Razorpay(options);
    rzp1.on('payment.failed',function(response){
      alert(response.error.code);
         alert(response.error.description);
            alert(response.error.source);
               alert(response.error.step);
                  alert(response.error.reason);
                     alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  }
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
  }, [userHistory, userPresent]);
  const handleDeactivate=async(id)=>{
     try {
      const response = await fetch(`https://hire-helper-3.onrender.com/api/auth/deleteActiveUser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  sessionStorage.getItem('token'),
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
      <div style={{marginTop:"15px"}}><h3 style={{ fontFamily: "Montserrat, sans-serif" }}><b>SEE YOUR  ACTIVE HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {present.map((presenties)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem",textAlign :"left"}}>
      <img src="https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h6 className="card-title">Name :{presenties.name}</h6><br/>
    <h6 className="card-title">Category :{presenties.category}</h6><br/>
    <h6 className="card-title">Location :{presenties.location}</h6><br/>
     <h6 className="card-title">charges :{presenties.charges}</h6><br/>
    <h6 className="card-title">Date :{presenties.date}</h6>
    <p className="card-text" style={{textAlign:"left"}}>
      <button className='btn btn-primary mx-1 ' onClick={async (e) => {
    const userwill=prompt("Type 'yes' to Stop service from helper otherwise  type 'NO'")
   if(userwill==="yes")
   {
    e.preventDefault();
     console.log(sessionStorage.getItem('token'))
    try {
      const response = await fetch("https://hire-helper-3.onrender.com/api/auth/addhistory", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':  sessionStorage.getItem('token'),
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
          <button className='btn btn-primary mx-1 '   onClick={(e) => paymentHandler(presenties.charges, e)} >Pay</button>
  <Link to="/tracker"> map</Link>
{/* <i class="fas fa-map-marker-alt" ></i> */}
    </p>
   

  </div> 
</div>
  })}

</div>
  </div>
  




       <div style={{marginTop:"15px"}}><h3 style={{ fontFamily: "Montserrat, sans-serif" }}><b>SEE YOUR  PAST HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {history.map((historian)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem",textAlign :"left"}}>
      <img src="https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg" className="card-img-top" alt="..." />
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
