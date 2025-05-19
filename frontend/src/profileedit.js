import React, { useState, useEffect } from 'react';
import './profileE.css'
function ProfileE() {
    const [profile, setProfile] = useState({
        name: '',
        nickname: '',
        profileimage: '',
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No token found. Please login.');
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('http://localhost:5000/api/profile/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data); // Use data directly, not {data}
                } else {
                    setMessage('Failed fetching profile');
                }
            } catch (e) {
                console.error(e);
                setMessage('Error fetching profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:5000/api/profile/me', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setMessage('✅ Profile updated successfully!');
            } else {
                setMessage('❌ Failed to update profile.');
            }
        } catch (e) {
            console.error(e);
            setMessage('❌ Error updating profile');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="edit-container">
            <h2 className="edit-header">Edit Profile</h2>
            {message && <p className="message">{message}</p>}
            <form className="edit-form" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Nickname:</label><br />
                    <input
                        type="text"
                        name="nickname"
                        value={profile.nickname}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <label>Profile Image URL:</label><br />
                    <input
                        type="text"
                        name="profileimage"
                        value={profile.profileimage}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <button type="submit" className="update-button" style={{ marginTop: '10px' }}>
                    Update Profile
                </button>
            </form>

            {profile.profileimage && (
                <div style={{ marginTop: '20px' }}>
                    <h4>Current Profile Image:</h4>
                    <img
                        src={profile.profileimage}
                        alt="Profile"
                        className="current-image"
                    />
                </div>
            )}
        </div>
    );
}

export default ProfileE;
