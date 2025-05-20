import React, { useState, useEffect } from 'react';
import axios from "axios";

function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('userid'); // make sure this key matches across the app
        if (id) {
            setUserId(id);
            fetchFriends(id);
        }
    }, []);

    const fetchFriends = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/friends/friends/${id}`);
            setFriends(res.data.friends || []);
        } catch (e) {
            console.error("Error fetching friends", e);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
            {friends.length === 0 ? (
                <p>You have no friends yet.</p>
            ) : (
                <div className="space-y-4">
                    {friends.map((friend) => (
                        <div
                            key={friend._id}
                            className="flex items-center border p-3 rounded shadow"
                        >
                            <img
                                src={friend.profileimage || "/default-profile.png"}
                                alt={friend.name}
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <div>
                                <p className="font-medium">{friend.name}</p>
                                <p className="text-sm text-gray-500">@{friend.nickname}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FriendsList;
