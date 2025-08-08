import React,{useState,useContext} from 'react'
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/helpers/AuthContext';



function Login() {
 const{setToken,setLoginType}=useContext(AuthContext)
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      role:''
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
    if(formData.role==="user"){
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
      localStorage.setItem("token",data.authtoken);
      setToken(data.authtoken)
         localStorage.setItem("type","user");
         setLoginType("user")
        navigate("/")
        console.log(data);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error finding user");
    }
  }
  else{
      try {
      const response = await fetch('http://localhost:5000/api/HelperAuth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
          localStorage.setItem("token",data.authtoken);
          
      setToken(data.authtoken)
       localStorage.setItem("type","helper");
        setLoginType("helper")
        navigate("/")
        console.log(data);
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error finding user");
    } 
  }
  };

  
  
  return (<>
    <Alert class="alert alert-info" message ="Login to continue!!"/>
  <div className="container" style={{ display:"flex",justifyContent:"center",alignItems:"center",textAlign: "left"}}>
    <div className="loginForm" >
      <h1>This is login page</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
  <label htmlFor="role" className="form-label">Select Role</label>
  <select
    className="form-select"
    id="role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    required
  ><option value="">Select role</option><option value="user">UserLogin</option><option value="helper">HelperLogin</option>
  </select>
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

 

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
    </div>
    </>
  )
}

export default Login
