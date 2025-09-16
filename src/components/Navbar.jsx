import React,{useContext} from 'react'
import{Link,useNavigate}from 'react-router-dom'
import AuthContext from '../context/helpers/AuthContext';

 
function Navbar(props) {
  const{setToken,setLoginType}=useContext(AuthContext)
  const navigate=useNavigate();
const handleLogOut=()=>{
setToken(null);
 sessionStorage.removeItem("token");
 setLoginType(null);
 sessionStorage.removeItem("type");
  navigate('/login')
}
const loginType=sessionStorage.getItem("type");
  

  return (
   
   <nav
  className="navbar navbar-expand-lg navbar-dark"
  style={{ backgroundColor: "#d6d6c8ff" }}
>

      <div className="container-fluid">
        <a className="navbar-brand" href="/"><h5 style={{ color: "black" }}><b>HELPER</b></h5></a>
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
          {sessionStorage.getItem("token")&&loginType==="user"?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/"><h6 style={{ color: "black" }}>Home</h6></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about"><h6 style={{ color: "black" }}>About</h6></a>
            </li>
          
            <li className="nav-item">
              <a className="nav-link" href="/dashboard"><h6 style={{ color: "black" }}>Dashboard</h6></a>
            </li>
             <li className="nav-item">
              <a className="nav-link" href="/details"><h6 style={{ color: "black" }}>Details</h6></a>
            </li>
         
          </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <a className="nav-link" href="/about"><h6 style={{ color: "black" }}>About</h6></a>
            </li>
          {loginType === "helper" && (
            <>
    <li className="nav-item">
      <a className="nav-link" href="/HelperDashboard"><h6 style={{ color: "black" }}>Dashboard</h6></a>
    </li>
       <li className="nav-item">
              <a className="nav-link" href="/details"><h6 style={{ color: "black" }}>Details</h6></a>
            </li>
            </>
  )}
            
          </ul>}
          

{!sessionStorage.getItem("token")?<form className="d-flex">
         <Link type="button " className="btn btn-secondary mx-2" to="/login">Login</Link>
         <Link type="button" className="btn btn-secondary mx-2" to="/signup">SignUp</Link>
          </form>:<button onClick={handleLogOut}className="btn btn-primary">LogOut</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
