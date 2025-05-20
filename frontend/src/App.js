import React, { useState } from 'react';
import Signup from  './signup';
import {useNavigate} from 'react-router-dom';
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import FriendsList from "./friendslist";
import Pendingrequest from "./pendinrequest";

import './loginandsignup.css'
import Dash from './dashbaord';
import ProfileV from './profileview';
import ProfileE from './profileedit'
import SearchPage from "./searchpage";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    // const [user_id,setUserId] = useState('');
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
                console.log('User:', data.user);

                localStorage.setItem('token', data.token);
                localStorage.setItem('userid', data.user._id); // don’t comment this out

                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Error connecting to server');
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
            <Route path ={"/friends"} element={<FriendsList />}/>
            <Route path={"/search"} element={<SearchPage />}/>
            <Route path={"/pending"} element={<Pendingrequest />}/>
        </Routes>
      </Router>
  );
}
export default App;
