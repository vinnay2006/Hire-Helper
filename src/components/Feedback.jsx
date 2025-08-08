import React from 'react'

function Feedback() {
  return (
    <>
    
    <div className="container" style={{ display:"flex",justifyContent:"center",alignItems:"center",textAlign: "left"}}>
    <div className="SignUpForm" >
      <h3>Give your Genuine Feedback!!</h3>
      <form >
<input type="text" id="feedbackInput" style={{width: "450px", height: "100px"}} placeholder="Enter your feedback about our helper here"/><br/>
<button className='btn btn-primary my-1'>submit</button>

</form>

    </div>
    </div>
    </>
  )
}

export default Feedback
