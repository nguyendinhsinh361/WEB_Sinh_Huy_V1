const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

exports.authen = (req, res, next) => {
    let sessionID =  req.session.userId;
    UserModel.findById(sessionID, (err, user) => {
        if(!user || err) {
            return res.redirect('/user/login')    
        }
        next();
    })
}

// Authorization: Bearer sfdsfdssfsdgsdgd

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    // Nếu không có header thì nó là header còn có thì nó là cái đằng sau
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) 
        return res.status(401).json({success: false, message: 'Access token not found'})
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log(error);
        return res.status(403).json({success: false, message: 'Invalid token'})
    }
}

