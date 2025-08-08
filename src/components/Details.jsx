import React, { useContext, useEffect } from 'react';
import AuthContext from "../context/helpers/AuthContext";

function Details() {
  const { details, clientDetails } = useContext(AuthContext);

  useEffect(() => {
    clientDetails();
  }, []);

  // Optional: loading fallback
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
              <h6 className="card-title">Name: {details.name}</h6><br />
              <h6 className="card-title">Email: {details.email}</h6><br />
              <h6 className="card-title">Location: {details.location}</h6><br />
              <h6 className="card-title">Mobile No.: {details.mobile_no}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

