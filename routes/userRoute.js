const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
const upload = multer();
const auth = require('../middleware/auth')



router.get('/register', (req, res) => {
    res.render("register");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/register', upload.none(), userController.userRegister);
router.post('/login', upload.none(), userController.userLogin);
router.get('/logout', auth.authen, userController.userLogout);

router.get('/manager', auth.admin, userController.showUser)
router.get('/manager/edit/:id', auth.admin, userController.showFormUpdate)
router.put('/manager/:id', auth.admin, userController.updateUser)
router.delete('/manager/:id', auth.admin, userController.deleteUser)
  

module.exports = router;