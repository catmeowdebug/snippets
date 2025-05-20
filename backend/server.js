const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileroute=require('./routes/profle')
const friendroute=require('./routes/friendreqroute');
const app = express();

async function startserver() {
    try {
        await connectDB();
        app.use(cors());
        app.use(express.json());
        app.use('/api/auth', authRoutes);
        app.use('/api/profile',profileroute);
        app.use('/api/friends', friendroute);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (e) {
        console.log(`❌ Server error: ${e}`);
        console.log("Error in server.js");
    }
}

startserver();
