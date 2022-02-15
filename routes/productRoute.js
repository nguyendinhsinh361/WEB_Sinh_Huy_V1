const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/productController')
const auth = require('../middleware/auth');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let uploadImg = multer({
    storage: storage
})

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/shop', auth.authen, (req, res) => {
    res.render("shop");
});

router.get('/contact', auth.authen, (req, res) => {
    res.render('contact')
});
router.get('/blog', auth.authen, (req, res) => {
    res.render("blog");
});

router.get('/addProduct', auth.authen, (req, res) => {
    res.render("addProduct");
});

router.get('/abc', productController.showProduct)
router.post('/shop/addProduct', uploadImg.single('img'), productController.createProduct)

module.exports = router;