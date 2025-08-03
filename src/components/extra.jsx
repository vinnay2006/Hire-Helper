import React from 'react'

function CandTypeSignup() {
  return (
    < div className=" row" >
        <div className="card col-md-4 me-5" style={{ width: "15rem" }}>
  <div className="card-body">
    <h5 className="card-title">User</h5>
    <p className="card-text" style={{textAlign:"left"}}>
  
    </p>
    <a href="/Signup" className="btn btn-primary">User SignUp</a>
  </div> 
</div>

            <div className="card col-md-4 me-5" style={{ width: "15rem" }}>
  <div className="card-body">
    <h5 className="card-title">User</h5>
    <p className="card-text" style={{textAlign:"left"}}>
  
    </p>
    <a href="/Signup" className="btn btn-primary">Helper SignUp</a>
  </div> 
</div>  
    </div>
  )
}

export default CandTypeSignup
