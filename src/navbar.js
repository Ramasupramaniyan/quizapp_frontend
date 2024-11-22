import React from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import axios from 'axios'

const Navbar = ({name}) => {

    const userName = sessionStorage.getItem('name');
    const navigate = useNavigate()
    const location = useLocation();

    const logout = () => {
        axios.get("http://localhost:5000/api/auth/logout", {});
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        navigate("http://localhost:3000/login");
    };
    
    const goToTest = () => {
        navigate("/quiz")
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Left side: App Name and Headings */}
                <a className="navbar-brand">{name}</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link">Welcome back ! {userName} </a>
                        </li>
                    </ul>
                </div>
                {/* Right side: Logout Button */}
                {location.pathname !== '/quiz' && (
                    <>
                        <button className="btn btn-warning m-1" onClick={goToTest}>Take Test</button>
                    </>
                )}
                <button className="btn btn-danger m-1" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;
