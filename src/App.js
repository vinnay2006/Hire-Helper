import { useEffect } from "react";
import { io } from "socket.io-client";

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
import Details from './components/Details';
import CallRoom from './components/CallRoom';

const socket = io("https://hire-helper-3.onrender.com");

function App() {

  useEffect(() => {
    const handleSocket = (data) => {
      console.log("server says", data);
    };

    socket.on("detailsReceived", handleSocket);

    return () => {
      socket.off("detailsReceived", handleSocket);
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
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tutor" element={<Tutor />} />
              <Route path="/UserSignup" element={<UserSignup />} />
              <Route path="/HelperSignup" element={<HelperSignup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hire" element={<HireHelper />} />
              <Route path="/HelperDashboard" element={<HelperDashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/details" element={<Details />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/callroom/:roomId" element={<CallRoom />} />
            </Routes>

          </div>
        </HelperState>
      </AuthState>
    </>
  );
}

export default App;
