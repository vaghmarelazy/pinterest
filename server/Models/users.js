const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    // --------------password is handeled by Passport-local-mongoose-------------
    password: {
        type: String,
        required: true
    },
    dp: {
        type: String,
        default: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.914516780.1705759586&semt=ais'
    },
    bio: {
        type: String,
        default: 'I love Photography'
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema)

module.exports = User;
