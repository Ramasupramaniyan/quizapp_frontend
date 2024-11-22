import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {    

    const [name, setName]           = useState()
    const [email, setEmail]         = useState()
    const [password, setPassword]   = useState()
    const navigate                  = useNavigate()
    const emailRegex                = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [errors, setErrors]       = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validateForm()){
            axios.post("http://localhost:5000/register", { name, email, password })
            .then(result => {
                if(!result.data.success){
                    alert(result.data.message)
                    return false;
                }
                navigate("/login")
            })
            .catch(err => alert('Something went wrong.Try after sometime'))
        }
    }

    const validateForm = () => {
        let formIsValid = true;
        let errors = { email: '', password: '',name:''};
        if (!email) {
            formIsValid = false;
            errors.email = 'Email is required';
        }else if(!emailRegex.test(email)){
            formIsValid     = false;
            errors.email    = "Please enter valid email id";
        }
        if (!password) {
            formIsValid = false;
            errors.password = 'Password is required';
        }else if(password.length < 8){
            formIsValid = false;
            errors.password = "Password must have at least 8 characters";
        }
        if(!name){
            formIsValid = false;
            errors.name = 'Name is required';
        }
        setErrors(errors);
        return formIsValid;
    };


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
        <h2><center>Sign Up</center></h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Name' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
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
                    Sign Up
                </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            
        </div>
    </div>
  );
}

export default Signup;