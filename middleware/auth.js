const UserModel = require('../model/userModel');

exports.authen = (req, res, next) => {
    let sessionID =  req.session.userId;
    UserModel.findById(sessionID, (err, user) => {
        if(!user || err) {
            return res.redirect('/user/login')    
        }
        next();
    })
}
