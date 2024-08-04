const userModel = require('../Models/users');
const postModel = require('../Models/posts');
const jwt = require('jsonwebtoken'); // Import JWT
const bcrypt = require('bcryptjs')
const secret = "secret"

const initialPage = (req, res, next) => {
    res.status(200).json({ message: "Connected Successfully" });
};


// -------------User Registration----------------
async function signup(req, res) {
    const { fullname, email, username, password } = req.body;

    if (!username || !email || !fullname || !password) {
        return res.status(400).json({ message: 'Please fill all the details' });
    }
    if (username.length < 3 || username.length > 8 || password.length < 3 || password.length > 8) {
        return res.status(400).json({ message: 'Invalid username or password length' });
    }
    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists, Please Log in', username });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ fullname, email, username, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, secret, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registration successful', token });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(400).json({ message: 'Registration failed. Please try again.' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function feed(req, res) {
    res.status(200).json({ message: 'Feed data', user: req.user })
}


async function profile(req, res) {
    res.status(200).json({ message: 'User profile', user: req.user })
}
async function editprofile_pre(req, res) {
    res.status(200).json({ message: 'User profile', user: req.user })
}
async function editprofile_post(req, res) {
    const { newUsername, newFullName, newBio } = req.body;
    const userId = req.user._id; // Extract userId from the authenticated token

    if (!newUsername || !newFullName || !newBio) {
        return res.status(400).json({ message: 'Please fill all the details' });
    }

    if (newUsername.length < 3 || newUsername.length > 8) {
        return res.status(400).json({ message: 'Invalid username length' });
    }

    if (req.user.username !== newUsername) {
        // Check if the new username already exists
        const usernameExists = await userModel.findOne({ username: newUsername });
        if (usernameExists && usernameExists._id.toString() !== userId) {
            return res.status(400).json({ message: 'Username already exists, try a different one' });
        }
    }
    // Update the user profile
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { username: newUsername, fullname: newFullName, bio: newBio },
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile Updated Successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function uploadpost (req, res){

}
module.exports = { initialPage, signup, login, feed, profile, editprofile_pre, editprofile_post, uploadpost };
