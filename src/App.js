
import './App.css';
import Navbar from './components/Navbar';
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
import HireHelper from './components/HireHelper';

function App() {
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
      </Routes>
    </div>
   </HelperState>
   </AuthState>
    </>
  );
}

export default App;
