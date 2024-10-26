import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './NavBar/NavBar.jsx'
import Home from './Home/Home.jsx'
import Profile from './Profile/Profile.jsx'
import Metrics from './Metrics/Metrics.jsx'
import About from './About/About.jsx'
import Report from './Report/Report.jsx'
import Login from './Login/Login.jsx'
import PrintPreview from './PrintPreview/PrintPreview.jsx'
import Registration from './Registration/Registration.jsx'
import ForgotPassword from './Login/ForgotPassword.jsx'
import './index.css'

const router = createBrowserRouter([

  {
    path:"/",
    element: <Home/>
  },
  {
    path:"/profile",
    element: <Profile/>
  },
  {
    path:"/about",
    element: <About/>
  },
  {
    path:"/metrics",
    element: <Metrics/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/report",
    element: <Report/>
  },
  {
    path:"/preview",
    element: <PrintPreview/>
  },
  {
    path:"/registration",
    element: <Registration/>
  },
  {
    path:"/forgotpassword",
    element: <ForgotPassword/>
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router}/>
  </StrictMode>,
)
