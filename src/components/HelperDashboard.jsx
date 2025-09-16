import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
function HelperDashboard() {
  const context=useContext(HelperContext);
   const {Helperpresent,setHelperpresent,HelperPresent}=context;
    useEffect(() => {
 HelperPresent();
  }, []);
  return (
    <>
    <div>
      <h3>Helper Dashboard</h3>
    </div>
          <div style={{marginTop:"15px"}}><h3 style={{ fontFamily: "Montserrat, sans-serif" }}><b>SEE YOUR  ACTIVE HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">
  {Helperpresent.map((presenties)=>{
  return <div className="card col-md-3 me-5" style={{ width: "20rem",textAlign :"left"}}>
      <img src="https://thumbs.dreamstime.com/b/happy-person-portrait-smiling-woman-tanned-skin-curly-hair-happy-person-portrait-smiling-young-friendly-woman-197501184.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h6 className="card-title">Name :{presenties.user?.name}</h6><br/>
    <h6 className="card-title">Category :{presenties.user?.email}</h6><br/>
    <h6 className="card-title">Location :{presenties.user?.mobile_no}</h6><br/>
     <h6 className="card-title">charges :{presenties.user?.location}</h6><br/>
    <h6 className="card-title">Date :{presenties.date}</h6>
  <button className="btn btn-primary">enter_room</button>

  </div> 
</div>
  })}

</div>

  </div>
    <div>
      <h4>see closed cases</h4>
    </div>
    </>
  )
}

export default HelperDashboard
