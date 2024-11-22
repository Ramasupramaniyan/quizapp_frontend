import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {    

    const [email, setEmail]         = useState("")
    const [password, setPassword]   = useState("")
    const navigate                  = useNavigate()
    const emailRegex                = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [errors, setErrors]       = useState({ email: '', password: '' });
    const userEmail                 = sessionStorage.getItem("email"); 
    const validateForm = () => {
        let formIsValid = true;
        let errors      = { email: '', password: '' };
        if (!email) {
            formIsValid  = false;
            errors.email = 'Email is required';
        }else if(!emailRegex.test(email)){
            formIsValid  = false;
            errors.email = "Please enter valid email id";
        }
        if (!password) {
            formIsValid     = false;
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return formIsValid;
    };

    const handleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                if(result.data.success === true){
                    const token = result.data.token;
                    sessionStorage.setItem("authToken", token);
                    sessionStorage.setItem("name", result.data.name);
                    sessionStorage.setItem("email", result.data.email);
                    navigate("/home")
                }else{
                    navigate("/register")
                    alert("You are not registered.Please signup")
    
                }
           
            })
            .catch(err => 
                alert("Can't connect to the network")
            )
        }
    }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                <button type="button" className="mt-1 btn btn-danger  w-100 rounded-0" onClick={handleLogin}>Login with Google</button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-secondary border w-100  rounded-0">
                    Sign Up
                </Link>
        </div>
    </div>
  );
}

export default Login;