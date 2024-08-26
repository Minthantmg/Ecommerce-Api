const express = require('express')
const app = express()
const mongoose = require('mongoose');
const User = require("./models/user");
const productRoutes = require('./route/product.route');
const Product = require("./models/product");
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const MongoDbClient = process.env.MONGO_URI;

//routes
app.use('/product',productRoutes)

app.get('/',(req,res) =>{
    res.status(200).json('Hello from ecommerce Api')
})

app.get('/products',async (req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

mongoose.connect(MongoDbClient)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'))

app.listen(4000,() => {
    console.log("Server is running on port 4000")
})

module.exports = app