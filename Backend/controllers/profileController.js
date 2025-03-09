const User = require('../models/User');

// Fetch User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    const { fullname, contact, profileImage } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.fullname = fullname || user.fullname;
        user.contact = contact || user.contact;
        user.profileImage = profileImage || user.profileImage;

        await user.save();
        res.json({ msg: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
