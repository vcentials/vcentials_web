<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Home/Home.jsx'
import Login from "./Login/Login.jsx";
import ForgotPassword from "./Login/ForgotPassword.jsx";
import Profile from './Profile/Profile.jsx'
import About from './About/About.jsx'
import NavBar from "./NavBar/NavBar.jsx";
import Metrics from "./Metrics/Metrics.jsx";
import PrintPreview from "./PrintPreview/PrintPreview.jsx";
import './App.css'

=======
import './App.css'
import Login from './Login/Login.jsx'
>>>>>>> 90d493c3931f8140a49dc8fc5b89453d5d08e734

function App() {
  
    return(
<<<<<<< HEAD
        <Router>
            <div>
                <NavBar />

                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/print-preview" element={<PrintPreview />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="forgot-password" element={<ForgotPassword/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/metrics" element={<Metrics/>} />
                    
                </Routes>
            </div>
        </Router>
=======
        <>
            <Login/>
        </>
>>>>>>> 90d493c3931f8140a49dc8fc5b89453d5d08e734
    )
}

export default App
