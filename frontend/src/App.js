import React, { useState } from 'react';
import Signup from  './signup';
import {useNavigate} from 'react-router-dom';
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import Signup from  './signup;
import './loginandsignup.css'
import Dash from './dashbaord';
import ProfileV from './profileview';
import ProfileE from './profileedit'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login successful!');
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');// optionally save this to localStorage
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert('Error connecting to server');
      console.error(err);
    }
  };

  return (
      <div className="auth-container">
          <h2>Login</h2>
          {message && <p className="auth-message">{message}</p>}
          <form className="auth-form" onSubmit={handleLogin}>
              <input
                  className="auth-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  className="auth-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button className="auth-button" type="submit">Login</button>
          </form>
          <Link to="/register" className="auth-link">
              Don't have an account? Sign up now!!
          </Link>
      </div>
  );
}
function App(){
  return(
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />}/>
          <Route path={"/register"} element={<Signup />}/>
            <Route path ={"/dashboard"} element={<Dash />}/>
            <Route path={"/profile"} element={<ProfileV />}/>
            <Route path={"/edit-profile"} element={<ProfileE />}/>
        </Routes>
      </Router>
  );
}
export default App;
