import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [senderId, setSenderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = localStorage.getItem('userid'); // consistent key usage
        if (id) setSenderId(id);
    }, []);

    const handleSearch = async () => {
        if (!query.trim()) {
            setError("Please enter a name or nickname to search.");
            setResults([]);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`http://localhost:5000/api/friends/search?q=${query}`);
            setResults(res.data?.users || []);
        } catch (e) {
            console.error("Search error", e);
            setError("Failed to search users.");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const sendRequest = async (receiverId) => {
        if (!senderId) {
            alert("Sender ID not found.");
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/friends/send`, {
                sender: senderId,
                receiver: receiverId,
            });
            alert(res.data.message || "Friend request sent!");
        } catch (e) {
            console.error("Send request error", e.response || e.message || e);
            alert(e.response?.data?.message || "Failed to send request.");
        }
    };


    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Search Users</h2>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter name or nickname"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 rounded w-full"
                    onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button
                    onClick={handleSearch}
                    className={`bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50`}
                    disabled={loading || !query.trim()}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {results.length === 0 && query.trim() && !loading && !error && (
                <p className="text-gray-500">No users found.</p>
            )}

            <div className="space-y-4">
                {results.map((user) => (
                    <div
                        key={user._id}
                        className="flex justify-between items-center border p-3 rounded shadow"
                    >
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">@{user.nickname}</p>
                        </div>
                        <button
                            onClick={() => sendRequest(user._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Send Request
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
