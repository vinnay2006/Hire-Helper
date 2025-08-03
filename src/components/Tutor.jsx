import React, { useContext,useEffect } from 'react'
import HelperContext from "../context/helpers/HelperContext"
function Tutor() {
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
    <a href="/hire" onClick={(e)=>{
    e.preventDefault();
    console.log(`"${helper.name}" +"${helper.mobile_no}"`)
  }}className="btn btn-primary">HIRE_NOW</a>
  </div> 
</div>
  })}

</div>
  </div>
  </>
  )
}

export default Tutor
