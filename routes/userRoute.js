const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');
const upload = multer();

router.get('/register', (req, res) => {
    res.render("register");
});

router.get('/login', (req, res) => {
    res.render("login");
});

router.post('/register', upload.none(), userController.userRegister);
router.post('/login', upload.none(), userController.userLogin);
router.get('/logout', userController.userLogout);

module.exports = router;