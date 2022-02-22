require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        // Các tên username phải khác nhau
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        // Store hash in your password DB.
        if (err) console.error(err);
        console.log(hash);
        user.password = hash;
        next();
    });
})

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;