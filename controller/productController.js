const ProductModel = require('../model/productModel');
const fs = require('fs');
const path = require('path')

exports.showProduct = async (req, res) => {
    ProductModel.find({}, (err, products) => {
        if(err) {
            console.log(err)
            return;
        }
        else {
            res.render('shop', {products: products})
        }
    })
}

exports.createProduct = async (req, res) => {
    // Validate request 
    if(!req.body) {
        res.status(400).send({message: `Content can not be empty !`});
        return;
    }
    // New product
    let product = {
        title: req.body.title,
        cost: req.body.cost,
        sex: req.body.sex || "Male",
        description: req.body.description,
        status: req.body.status || 'NEW',
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        user: userDetail
    }
    ProductModel.create(product, (err, item) => {
        if(err) console.error(err);
        res.redirect('/shop/shopDetail');
    })
}