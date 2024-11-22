import {useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useNavigate, useLocation  } from 'react-router-dom';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import QuizPage from './Quizpage';

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper />
    </BrowserRouter>
  );
}

function AuthWrapper() {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  if(queryParams.get("email")){
    sessionStorage.setItem("authToken", queryParams.get("token"));
    sessionStorage.setItem("name",      queryParams.get("userName"));
    sessionStorage.setItem("email",     queryParams.get("email"));
  }
  const isLoggedIn = sessionStorage.getItem('authToken');
  console.log("Auth token", isLoggedIn,location.pathname);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login');
    }else if(isLoggedIn && (location.pathname == '/login' || location.pathname == '/register')){
      navigate('/home');
    }else if(location.pathname == '/'){
      navigate('/home');
    }
  }, [isLoggedIn, navigate]); // Only run this effect when isLoggedIn or navigate changes

  return (
    <Routes>
      <Route path='/register' element={<Signup />} />
      <Route path='/login'    element={<Login />}  />
      <Route path='/home'     element={<Home />}   />
      <Route path='/quiz'     element={<QuizPage />} />
    </Routes>
  );
}

export default App;
