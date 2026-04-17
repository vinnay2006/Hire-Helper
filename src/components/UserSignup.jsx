
import React,{useState} from 'react'
import Alert from './Alert';
import {useNavigate} from "react-router-dom"

function UserSignup() {
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile_no: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://hire-helper-1.onrender.com/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
      
        navigate("/login")
        console.log(data);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating user");
    }
  };
  
  return (<>
   <Alert class="alert alert-info" message ="SignUP to continue!!"/>
    <div className="container" style={{ display:"flex",justifyContent:"center",alignItems:"center",textAlign: "left"}}>
    <div className="SignUpForm" >
      <h1>This is  User SignUp page</h1>
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="nameHelp" value={formData.name}onChange={handleChange} required />
  </div>    
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={formData.email} aria-describedby="emailHelp" onChange={handleChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={formData.password}onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
    <input type="text" className="form-control" id="location" name="location" value={formData.location}onChange={handleChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputmobile_no" className="form-label">mobile_no</label>
    <input type="text" className="form-control" id="mobile_no"  name="mobile_no" value={formData.mobile_no}onChange={handleChange} required/>
  </div>

 

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
    </div>
    </>
  )
}

export default UserSignup
