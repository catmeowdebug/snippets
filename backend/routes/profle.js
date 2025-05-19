const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Token missing or invalid" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token verification failed" });
        req.user = user;
        next();
    });
};
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (e) {
        console.error("Error fetching profile:", e.message);
        res.status(500).json({ message: "Server error while fetching profile" });
    }
});
router.put('/me', authenticateToken, async (req, res) => {
    const { name, nickname, profileimage } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, nickname, profileimage },
            { new: true }
        ).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (e) {
        console.error("Error updating profile:", e.message);
        res.status(500).json({ message: "Server error while updating profile" });
    }
});

module.exports = router;
