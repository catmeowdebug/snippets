import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './profile.css'
function ProfileV() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please login again');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/profile/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                } else {
                    setMessage('Failed to fetch profile');
                }
            } catch (e) {
                console.error("Error fetching profile", e);
                setMessage('Error loading profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (message) return <p>{message}</p>;
    if (!profile) return <p>No profile data found.</p>;

    return (<div className="profile-container">
            <h2 className="profile-header">Your Profile</h2>
            <p className="profile-info"><span className="profile-label">Name:</span> {profile.name || 'N/A'}</p>
            <p className="profile-info"><span className="profile-label">Nickname:</span> {profile.nickname || 'N/A'}</p>
            {profile.profileimage && (
                <img src={profile.profileimage} alt="Profile" className="profile-image" />
            )}
            <a href="/edit-profile" className="edit-link">Edit Profile</a>
        </div>

    );
}

export default ProfileV;
