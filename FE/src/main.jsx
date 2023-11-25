import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/app/App.jsx'
import './index.css'
import axios from 'axios';
import {
    createBrowserRouter, Navigate,
    RouterProvider, useNavigate,
} from "react-router-dom";
import {AuthProvider, useAuth} from './contexts/AuthContext'
import Dashboard from "./routes/dashboard/Dashboard";
import Login from "./routes/login/Login";
import Signup from "./routes/signup/Signup.jsx";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.useCredentials = true;

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    // if (isAuthenticated === false) {
    //     return null;
    // }

    return isAuthenticated ? element : <Navigate to={'/'} />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute element={<Dashboard />} />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
