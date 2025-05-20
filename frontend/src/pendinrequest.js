import React, { useState, useEffect } from "react";
import axios from "axios";

function PendingRequest() {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const id = localStorage.getItem("userid"); // keep this consistent across all files
        if (id) {
            setUserId(id);
            fetchPendingRequests(id);
        }
    }, []);

    const fetchPendingRequests = async (userid) => {
        try {console.log("Calling pending for user:", userid);
            const res = await axios.get(`http://localhost:5000/api/friends/pending/${userid}`);
            setPendingRequests(res.data.requests || []); // assume it's an array called 'requests'
        } catch (e) {
            console.error('Error fetching pending requests:', e);
        }
    };

    const handleAccept = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/friends/${id}/accept`);
            alert("Request accepted");
            fetchPendingRequests(userId);
        } catch (e) {
            console.error('Error accepting request:', e);
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.post(`http://localhost:5000/api/friends/${requestId}/reject`);
            alert("Request rejected");
            fetchPendingRequests(userId);
        } catch (e) {
            console.error('Error rejecting request:', e);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Pending Friend Requests</h2>
            {pendingRequests.length === 0 ? (
                <p>No pending requests.</p>
            ) : (
                <div className="space-y-4">
                    {pendingRequests.map((req) => (
                        <div
                            key={req._id}
                            className="flex justify-between items-center border p-3 rounded shadow"
                        >
                            <div>
                                <p className="font-medium">{req.sender.name}</p>
                                <p className="text-sm text-gray-500">@{req.sender.nickname}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(req._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(req._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PendingRequest;
