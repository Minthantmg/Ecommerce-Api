const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    "name" : String,
    "main_category" : String,
    "sub_category" : String,
    "link" : String,
    "ratings" : Number,
    "no_of_ratings":Number,
    "discount_price": String,
    "actual_price" : String,
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;