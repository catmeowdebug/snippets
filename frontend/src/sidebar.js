
import React from 'react';
import { Link } from 'react-router-dom';
import './dash.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar} className="close-button"aria-label="Close-sidebar">×</button>
            <h2>Dashboard</h2>
            <ul>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to ="/search">Search Users</Link></li>
                <li><Link to="/pending">friend requests</Link></li>
                <li><Link to="/friends">your friends</Link></li>
                <li><Link to="/" onClick={() => localStorage.clear()}>Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
