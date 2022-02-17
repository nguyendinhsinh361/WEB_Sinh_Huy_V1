const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    sex:{
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['new', 'sale', 'stockout', 'stockblue']
    },
    category: {
        type: String,
        enum: ['women', 'men', 'kid', 'accessories', 'cosmetic']
    },
    img: {
        data: Buffer,
        contentType: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Products = mongoose.model('Products', ProductSchema);
module.exports = Products;