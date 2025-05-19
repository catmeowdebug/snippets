import React, { useState } from 'react';
import Sidebar from './sidebar';
import './dash.css';

const Dash = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            {!isOpen && (
                <button onClick={toggleSidebar} className="open-btn">☰</button>
            )}
            <div style={{
                marginLeft: isOpen ? '200px' : '0',
                padding: '40px',
                transition: 'margin-left 0.3s ease'
            }}>
                <h1>Welcome to your Dashboard</h1>
                <p>This is where your main content will go.</p>
            </div>
        </div>
    );
};

export default Dash;
