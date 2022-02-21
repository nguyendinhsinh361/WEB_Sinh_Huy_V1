const UserModel = require('../model/userModel');
require('dotenv').config();

exports.authen = (req, res, next) => {
    let sessionID =  req.session.userId;
    UserModel.findById(sessionID, (err, user) => {
        if(!user || err) {
            return res.redirect('/user/login')    
        }
        next();
    })
}


exports.admin = (req, res, next) => {
    const admin = process.env.ADMIN;
    if(userDetail == admin) {
        next();
    }else {
        return res.redirect('/')  
    }
}
