import React, { useContext, useEffect,useState } from 'react';
import AuthContext from "../context/helpers/AuthContext";
import {useNavigate} from "react-router-dom"
import helperContext from '../context/helpers/HelperContext';
function Details() {
  const { details, clientDetails } = useContext(AuthContext);
    const { getHelpers } = useContext(helperContext);
 const initialFormState = sessionStorage.getItem("type") === "user"
  ? { name: "", email: "", location: "", mobile_no: "" }
  : { name: "", email: "", location: "", mobile_no: "", experience: "", charges: "",available:"" };
 const navigate=useNavigate();
const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (sessionStorage.getItem("type")==="user"&&details && formData.name === "") {
      setFormData({
        name: details.name || '',
        mobile_no: details.mobile_no || '',
        location: details.location || '',
        email: details.email || ''
      });
    }else if(sessionStorage.getItem("type")==="helper"&&details && formData.name === ""){
      setFormData({
        name: details.name || '',
        mobile_no: details.mobile_no || '',
        location: details.location || '',
        email: details.email || '',
        experience: details.experience || '',
        charges: details.charges || '',
        available: details.available || ''
      }); 
    }
  }, [details,formData.name]);
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
   clientDetails();
   
  }, [clientDetails]);
   const handleUpdate = async (e) => {
    
    try {
      e.preventDefault();
      let endpoint=null;
      if(sessionStorage.getItem("type")==="user"){
         endpoint="auth";
      }
      else if(sessionStorage.getItem("type")==="helper"){
          endpoint="HelperAuth";
      }
      const res = await fetch(`http://localhost:5000/api/${endpoint}/updateDetails/${details._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("token")
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update details: ${errorText}`);
      }

      // it will help in Refreshing after update in thew details
      await clientDetails();
      
      alert("Details updated successfully!");
      await  getHelpers();
      navigate("/tutor", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error updating details");
    }
  };

  if (!details) {
    return <div style={{ marginTop: "20px" }}><h4>Loading your details...</h4></div>;
  }

  return (
    <>
      <div style={{ marginTop: "15px" }}>
        <h3><b>SEE YOUR DETAILS</b></h3>
      </div>
      <br />
      <div className='Home-container' style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"
      }}>
        <div className="row">
          <div className="card col-md-3 me-5" style={{ width: "20rem", textAlign: "left" }}>
            <div className="card-body"> 
              {sessionStorage.getItem("type") === "user" ? (
  <>
    <h6 className="card-title">Name: {details.name}</h6><br />
    <h6 className="card-title">Email: {details.email}</h6><br />
    <h6 className="card-title">Location: {details.location}</h6><br />
    <h6 className="card-title">Mobile No.: {details.mobile_no}</h6>
  </>
) : (
  <>
    <h6 className="card-title">Name: {details.name}</h6><br />
    <h6 className="card-title">Email: {details.email}</h6><br />
    <h6 className="card-title">Location: {details.location}</h6><br />
    <h6 className="card-title">Mobile No.: {details.mobile_no}</h6><br/>
    <h6 className="card-title">Experience: {details.experience}</h6><br />
    <h6 className="card-title">Charges: {details.charges}</h6><br/>
    <h6 className="card-title">available: {details.available}</h6>
  </>
)}


              
              <i
                className="fa-solid fa-pen mx-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      </div>


      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Details</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form >
                {sessionStorage.getItem("type")==="user"?(<>
               <input type="text" name="name" className="form-control mb-2" onChange={handleChange}  value={formData.name}/>
              <input type="email"  name ="email" className="form-control mb-2"  onChange={handleChange}  value={formData.email}/> 
              <input type="text" name ="location" className="form-control mb-2" onChange={handleChange}  value={formData.location}/> 
              <input type="text"  name ="mobile_no" className="form-control mb-2"  onChange={handleChange}  value={formData.mobile_no}/> </>):
             (<>
               <input type="text" name="name" className="form-control mb-2" onChange={handleChange}  value={formData.name}/>
              <input type="email"  name ="email" className="form-control mb-2"  onChange={handleChange}  value={formData.email}/> 
              <input type="text" name ="location" className="form-control mb-2" onChange={handleChange}  value={formData.location}/> 
              <input type="text"  name ="mobile_no" className="form-control mb-2"  onChange={handleChange}  value={formData.mobile_no}/> 
               <input type="text"  name ="experience" className="form-control mb-2"  onChange={handleChange}  value={formData.experience}/>
                <input type="text"  name ="charges" className="form-control mb-2"  onChange={handleChange}  value={formData.charges}/>
                <input type="boolean"  name ="available" className="form-control mb-2"  onChange={handleChange}  value={formData.available}/></>)
             }
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary"onClick={handleUpdate}>
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
