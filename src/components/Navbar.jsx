import React,{useContext} from 'react'
import{Link,useNavigate}from 'react-router-dom'
import AuthContext from '../context/helpers/AuthContext';

 
function Navbar(props) {
  const{setToken,setLoginType}=useContext(AuthContext)
  const navigate=useNavigate();
const handleLogOut=()=>{
setToken(null);
 localStorage.removeItem("token");
 setLoginType(null);
 localStorage.removeItem("type");
  navigate('/login')
}
const loginType=localStorage.getItem("type");
  

  return (
   
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">
        <a className="navbar-brand" href="/"><b>HELPER</b></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {localStorage.getItem("token")&&loginType==="user"?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
          
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">UserDashBoard</a>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="/details">Details</a>
            </li>
         
          </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
            </li>
          {loginType === "helper" && (
            <>
    <li className="nav-item">
      <a className="nav-link" href="/HelperDashboard">HelperDashboard</a>
    </li>
       <li className="nav-item">
              <a className="nav-link" href="/details">Details</a>
            </li>
            </>
  )}
            
          </ul>}
          

{!localStorage.getItem("token")?<form className="d-flex">
         <Link type="button " className="btn btn-secondary mx-2" to="/login">Login</Link>
         <Link type="button" className="btn btn-secondary mx-2" to="/signup">SignUp</Link>
          </form>:<button onClick={handleLogOut}className="btn btn-primary">LogOut</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
