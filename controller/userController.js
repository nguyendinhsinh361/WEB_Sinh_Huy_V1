const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');

exports.userRegister = async function(req, res, next) {
    UserModel.create(req.body.password == req.body.comfirmPassword ? req.body : false, (err, user) => {
        if (err) res.redirect('/user/register')
        if (user) {
            res.redirect('/user/login');
        }
    })
}

exports.userLogin = async function(req, res , next) {
  const {username, password} = req.body;
  UserModel.findOne({username: username}, (error, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if(same) {
          userDetail = user.username
          req.session.userId = user._id;
          res.redirect('/');
        }
        else{
          res.redirect('/user/login')
        }
      })
    }else{
      res.redirect('/user/login')
    }
  })
}

exports.userLogout = function(req, res) {
  req.session.destroy(() => {
    res.redirect('/');
  })
}