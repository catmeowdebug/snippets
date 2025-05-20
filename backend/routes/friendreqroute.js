const express = require('express');
const router = express.Router();
const friends = require('../models/friendreq');
const users = require('../models/user');

// ACCEPT friend request
router.post('/:id/accept', async (req, res) => {
    try {
        const reqid = req.params.id;
        const request = await friends.findById(reqid);
        if (!request || request.status !== 'pending') {
            return res.status(400).json({ message: 'Request not found or already handled' });
        }
        request.status = 'accepted';
        await request.save();

        await users.findByIdAndUpdate(request.sender, {
            $addToSet: { friends: request.receiver }
        });
        await users.findByIdAndUpdate(request.receiver, {
            $addToSet: { friends: request.sender }
        });

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (e) {
        console.error("Error accepting friend request", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// REJECT friend request
router.post('/:id/reject', async (req, res) => {
    try {
        const reqid = req.params.id;
        const request = await friends.findById(reqid);
        if (!request || request.status !== 'pending') {
            return res.status(400).json({ message: 'Request not found or already handled' });
        }
        request.status = 'rejected';
        await request.save();

        res.status(200).json({ message: 'Friend request rejected' });
    } catch (e) {
        console.error("Error rejecting friend request", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// SEND friend request
router.post('/send', async (req, res) => {
    try {
        const { sender, receiver } = req.body;

        if (sender === receiver) {
            return res.status(400).json({ message: 'You can\'t send a friend request to yourself' });
        }

        const sendUser = await users.findById(sender);
        const receiveUser = await users.findById(receiver);
        if (!sendUser || !receiveUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const existingRequest = await friends.findOne({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ],
            status: { $in: ['pending', 'accepted'] }
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists or accepted' });
        }

        const newRequest = new friends({ sender, receiver });
        await newRequest.save();

        res.status(200).json({ message: 'Friend request sent' });
    } catch (e) {
        console.error("Error sending friend request", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// LIST user's friends
router.get('/friends/:id', async (req, res) => {
    try {
        const userid = req.params.id;
        const user = await users.findById(userid).populate('friends', 'name nickname profileimage');

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ friends: user.friends });
    } catch (e) {
        console.error("Error fetching friends", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// SEARCH users
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Search query missing' });
        }

        const results = await users.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { nickname: { $regex: query, $options: 'i' } }
            ]
        }, 'name nickname profileimage');

        res.status(200).json({ users: results });
    } catch (e) {
        console.error("Error in search", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PENDING requests to a user
router.get('/pending/:userid', async (req, res) => {
    try {
        const userid = req.params.userid;

        const pendingRequests = await friends.find({
            receiver: userid,
            status: 'pending'
        }).populate('sender', 'name nickname profileimage');

        res.status(200).json({ requests: pendingRequests });
    } catch (e) {
        console.error("Error fetching pending requests", e);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;
