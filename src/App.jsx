import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Home from './Home/Home.jsx'
import Profile from './Profile/Profile.jsx'
import Metrics from './Metrics/Metrics.jsx'
import About from './About/About.jsx'
import Report from './Report/Report.jsx'
import Login from './Login/Login.jsx'
import PrintPreview from './PrintPreview/PrintPreview.jsx'
import Registration from './Registration/Registration.jsx'
import ForgotPassword from './Login/ForgotPassword.jsx'
import Admin from './Admin/Admin.jsx'
import Email from './Email/Email.jsx'
import { ProtectedRoute } from './protectedRoute.jsx'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'



function App() {

    const [user, setUser] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
                setIsFetching(false);
                return;
            }

            setUser(null);
            setIsFetching(false);
        });
        return () => unsubscribe();

    }, []);

    const router = createBrowserRouter([

        {
          path:"/",
          element: <ProtectedRoute user={user}>
                        <Home/>
                    </ProtectedRoute>
        },
        {
          path:"/profile",
          element: <ProtectedRoute user={user}>
                        <Profile/>
                    </ProtectedRoute>
        },
        {
          path:"/about",
          element: <ProtectedRoute user={user}>
                        <About/>
                    </ProtectedRoute>
        },
        {
          path:"/metrics",
          element: <ProtectedRoute user={user}>
                        <Metrics/>
                    </ProtectedRoute>
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/report",
          element: <ProtectedRoute user={user}>
                        <Report/>
                    </ProtectedRoute>
        },
        {
          path:"/preview",
          element: <ProtectedRoute user={user}>
                        <PrintPreview/>
                    </ProtectedRoute>
        },
        {
          path:"/registration",
          element: <Registration/>
        },
        {
          path:"/forgotpassword",
          element: <ForgotPassword/>
        },
        {
          path:"/admin",
          element: <ProtectedRoute user={user}>
                        <Admin/>
                    </ProtectedRoute>
        },
        {
          path:"/email",
          element: <ProtectedRoute user={user}>
                        <Email/>
                    </ProtectedRoute>
        },
      
      ]);

      if (isFetching) {
        return   (

            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )

      }
  
    return(
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
