const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    category: String,
    name: String,
    description : String,
    product_image : String,
    brand: String
})

const Product = mongoose.model("Product",ProductSchema)
module.exports = Product;