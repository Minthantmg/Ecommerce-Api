const express = require('express');
var cors = require('cors');
const index = express();
const mongoose = require('mongoose');
const productRoutes = require('./route/product.route');
const Product = require("./models/product");

require('dotenv').config();
index.use(express.json());
index.use(express.urlencoded({ extended: false }));


const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

index.use(cors(corsOptions));

// Routes
index.use('/product', productRoutes);

const MongoDbClient = process.env.MONGO_URI;


index.get('/', (req, res) => {
    res.status(200).json('Hello from ecommerce Api');
});

index.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect(MongoDbClient)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'));

index.listen(4000, () => {
    console.log('Server is running on port 4000');
});

module.exports = index;
