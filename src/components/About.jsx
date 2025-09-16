import React from "react";

const About = () => {
  return (
    <div className="bg-light text-dark d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="container py-5 flex-grow-1">
        
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            About <span className="text-primary">Helper Finder</span>
          </h1>
          <p className="text-secondary fs-5">
            A platform to connect with trusted local service providers — quick, secure, and reliable.
          </p>
        </div>

        {/* Cards Section */}
        <div className="row g-4">
          
          {/* Mission Card */}
          <div className="col-md-6">
            <div className="card bg-black border-primary text-light shadow-lg h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">Our Mission</h5>
                <p className="card-text">
                  To empower users by connecting them with reliable helpers
                  for both daily tasks and professional services.
                </p>
              </div>
            </div>
          </div>

          {/* Technologies Card */}
          <div className="col-md-6">
            <div className="card bg-black border-success text-light shadow-lg h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-success">Technologies Used</h5>
                <p className="card-text">
                  Built with <strong>React.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong> 
                  for performance, security, and scalability.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
    <footer className="bg-black text-white py-4 mt-auto">
  <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
    <div className="mb-3 mb-md-0 text-center text-md-start">
      <h6 className="mb-2">Connect With Me</h6>
    </div>

    <div className="d-flex gap-3 fs-4">
      <a href="https://github.com/yourusername" className="text-white text-decoration-none">
        <i className="bi bi-github"></i>
      </a>
      <a href="https://linkedin.com/in/yourusername" className="text-white text-decoration-none">
        <i className="bi bi-linkedin"></i>
      </a>
      <a href="https://twitter.com/yourusername" className="text-white text-decoration-none">
        <i className="bi bi-twitter"></i>
      </a>
      <a href="https://instagram.com/yourusername" className="text-white text-decoration-none">
        <i className="bi bi-instagram"></i>
      </a>
    </div>
  </div>

  <div className="text-center text-muted small mt-3">
    © {new Date().getFullYear()} Helper Finder. All rights reserved.
  </div>
</footer>

    </div>
  );
};

export default About;

