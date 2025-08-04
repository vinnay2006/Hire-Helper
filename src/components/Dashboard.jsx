import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
function Dashboard() {
  
  const context=useContext(HelperContext);
  const {history,userHistory}=context;
    useEffect(() => {
    userHistory();
  }, [userHistory]);
  
  return (

      <>
      <div style={{marginTop:"15px"}}><h3><b>SEE YOUR  ACTIVE HELPERS</b></h3></div><br/>
   <div className='Home-container'style={{ display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
  
 <div className="row ">


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
      <button className='btn btn-primary mx-1 ' > FEEDBACK</button>
  
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
