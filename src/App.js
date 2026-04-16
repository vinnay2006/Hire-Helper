//new//

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// connect socket outside component so it doesn't reconnect every render

//end//
import './App.css';
import Navbar from './components/Navbar';
import Tracker from './components/Tracker';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Tutor from './components/Tutor';
import Dashboard from './components/Dashboard';
import UserSignup from './components/UserSignup';
import HelperSignup from './components/HelperSignup';
import HelperState from './context/helpers/HelperState';
import AuthState from './context/helpers/AuthState';
import About from './components/About';
import HelperDashboard from './components/HelperDashboard';
import HireHelper from './components/HireHelper';
import Feedback from './components/Feedback';
import Details from './components/Details'
import CallRoom from './components/CallRoom';

// import Checkout from './components/Checkout';
const socket = io("http://localhost:5000");
function App() {

    const [data, setData] = useState(null);

  useEffect(() => {
    // listening  for the  updates
    socket.on("detailsReceived", (data) => {
     console.log("server says ",data);
    });

    // cleaning up thesocket connections 
    return () => {
      socket.off("dataUpdate");

    };
  }, []);
  return (
    <>
    <AuthState>
   <HelperState>
    <div className="App">
  <Navbar />
   
   <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/UserSignup" element={< UserSignup/>} />
         <Route path="/HelperSignup" element={< HelperSignup/>} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/hire" element={<HireHelper />} />
         <Route path="/HelperDashboard" element={<HelperDashboard />} />
         <Route path="/feedback" element={<Feedback />} />
         <Route path="/details" element={<Details />} />
          <Route path="/tracker" element={<Tracker/>} />
         <Route path="/callroom/:roomId" element={<CallRoom />} />
         {/* <Route path="/checkout" element={<Checkout/>} /> */}
      </Routes>
    </div>
   </HelperState>
   </AuthState>
    </>
  );
}

export default App;
