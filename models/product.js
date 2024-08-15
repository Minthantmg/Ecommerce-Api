const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    "car_ID" : Number,
    "symboling" : Number,
    "CarName" : String,
    "fueltype" : String,
    "aspiration" : String,
    "doornumber" : String,
    "carbody" : String,
    "drivewheel" : String,
    "enginelocation" : String,
    "wheelbase" : Number,
    "carlength":Number,
    "carwidth" :Number,
    "carheight" : Number,
    "curbweight" : Number,
    "enginetype":String,
    "cylindernumber": String,
    "enginesize": Number,
    "fuelsystem" : String,
    "boreratio":Number,
    "stroke":Number,
    "compressionratio":Number,
    "horsepower":Number,
    "peakrpm":Number,
    "citympg":Number,
    "highwaympg":Number,
    "price":Number
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;