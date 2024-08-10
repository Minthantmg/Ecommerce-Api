const express = require('express')
const app = express()
const mongoose = require('mongoose');
const User = require("./models/user");
const Product = require("./models/product");
app.use(express.json())

app.get('/users',async (req,res) =>{
    try {
        const users = await User.find({})
        res.status(200).json(users)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.get('/user/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const userById = await User.findById(id)
        res.status(200).json(userById)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.put('/user/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const userById = await User.findOneAndUpdate(id,req.body)
        if (!userById){
            res.status(404).json({message:error.message})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.post('/register',async (req,res) =>{
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})


app.get('/products',async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.post('/product',async (req,res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id',async (req,res)=>{
    try {
        const {id} = req.params
        const productById = await Product.findById(id)
        res.status(200).json(productById)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://minthant180:09420059474mm@loginapi.mlckn.mongodb.net/LoginApi?retryWrites=true&w=majority&appName=LoginApi')
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'))

app.listen(4000,() => {
    console.log("Server is running on port 4000")
})