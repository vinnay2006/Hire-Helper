import React from 'react'

function Signup() {
  return (
    <div className="container"  style={{ display:"flex",justifyContent:"center",alignItems:"center",textAlign: "left",paddingTop:"100px"}}>
    < div className=" row" >
        <div className="card col-md-4 me-5" style={{ width: "15rem" }}>
  <div className="card-body">
    <h5 className="card-title">User</h5>
    <p className="card-text" style={{textAlign:"left"}}>
  
    </p>
    <a href="/UserSignup" className="btn btn-primary">User SignUp</a>
  </div> 
</div>

            <div className="card col-md-4 me-5" style={{ width: "15rem" }}>
  <div className="card-body">
    <h5 className="card-title">Helper</h5>
    <p className="card-text" style={{textAlign:"left"}}>
  
    </p>
    <a href="/HelperSignup" className="btn btn-primary">Helper SignUp</a>
  </div> 
</div>  
    </div>
    </div>
  )
}

export default Signup


