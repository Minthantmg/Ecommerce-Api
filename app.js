const express = require('express')
const app = express()
const mongoose = require('mongoose');
const User = require("./models/user");
const productRoutes = require('./route/product.route');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const MongoDbClient = process.env.MONGO_URI;

//routes
app.use('/product',productRoutes)

app.get('/',(req,res) =>{
    res.status(200).json('Hello from ecommerce Api')
})

mongoose.connect(MongoDbClient)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'))

app.listen(4000,() => {
    console.log("Server is running on port 4000")
})