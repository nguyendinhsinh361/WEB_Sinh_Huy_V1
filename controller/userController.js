const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');


UserModel.findOne({username: process.env.ADMIN}, (err, user) => {
  if(user) return
  else {
    UserModel.create({username: process.env.ADMIN, password: process.env.PASSWORD})
  }
})

  

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
          checkIdUser = user._id
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

exports.userLogout = async function(req, res) {
  console.log(req.session)
  req.session.destroy(() => {
    res.render('login');
  })
}


exports.showUser = async (req, res) => {
  UserModel.find({}, (err, users) => {
      if(err) {
          console.error(err)
          return;
      }
      else {
          res.render('managerUser', {users: users,  allUser})
      }
  })
}

exports.showFormUpdate = async (req, res) => {
  const id = req.params.id;
  let userFake;
  for(let i = 0 ; i < allUser.length ; i++) {
    if(allUser[i].id == id) {
      userFake = allUser[i];
    }
  }
  const user = await UserModel.findOne({_id:id});
  
  // Chuyển dưới dạng document;
  res.render('updateUser', {user, userFake})
}

exports.updateUser = async(req, res) => {
  const id = req.params.id;
  let {username, password} = req.body
  for(let i = 0 ; i < allUser.length ; i++) {
    if(allUser[i].id == id) {
      allUser[i].password = password;
    }
  }
  const user = await UserModel.findOne({_id:id});
  user.password = await bcrypt.hash(password, 10)
  console.log(user)
  await UserModel.findOneAndUpdate({_id: id}, user);
  res.redirect('/user/manager')
}

exports.deleteUser = async(req, res) => {
  const id = req.params.id;
  for(let i = 0 ; i < allUser.length ; i++) {
    if(allUser[i].id == id) {
      allUser.splice(i, 1)
    }
  }
  await UserModel.findOneAndRemove({_id: id});
  res.redirect('/user/manager')
}