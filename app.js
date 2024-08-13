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
    res.status(200).json({message: 'Hello from ecommerce Api'})
})

app.post('/register',async (req,res) =>{
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

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
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const userById = await User.findById(id)
        if(userById == null){
            res.status(302).json({message: "Invalid user ID"})
        }
        res.status(200).json(userById)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const userById = await User.findByIdAndUpdate(id, req.body);

        if (!userById) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect(MongoDbClient)
    .then(() => console.log('Connected!'))
    .catch(() => console.log('Connection Failed'))

app.listen(4000,() => {
    console.log("Server is running on port 4000")
})