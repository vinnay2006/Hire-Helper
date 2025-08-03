import React from 'react';

const About = () => {
  return (
    <div>
      <div>
        <h1>About Us</h1>

        <p>
          Welcome to <strong>Helper Finder</strong> — a platform where you can connect with local service providers quickly and securely. Whether you need assistance with daily tasks or professional help, we've got you covered.
        </p>

        <p>
          This platform was built with the vision to empower both users and helpers by providing a seamless and trustworthy experience. Users can sign up, browse nearby helpers based on their location, and contact them directly.
        </p>

        <p>
          We prioritize security by using JSON Web Tokens (JWT) for authentication and storing user data securely in MongoDB. The backend is powered by Express.js, and the frontend is built using React for a fast and responsive experience.
        </p>

        <p>
          If you have any suggestions, feel free to reach out to us. We're continuously improving to better serve your needs.
        </p>
      </div>
    </div>
  );
};

export default About;

