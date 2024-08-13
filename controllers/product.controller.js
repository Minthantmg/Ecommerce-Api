const Product = require("../models/product");
const mongoose = require("mongoose");
const getProducts =async (req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    }catch (error){
        res.status(500).json({message:error.message})
    }
}

const createProduct = async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }catch (error){
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req,res) => {
    try {
        const {id} = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const productById = await Product.findById(id)
        if(productById == null){
            res.status(302).json({message: "Invalid product ID"})
        }
        res.status(200).json(productById)
    }catch (error){
        res.status(500).json({message:error.message})
    }
}

const updateProduct = async (req,res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const productById = await Product.findByIdAndUpdate(id, req.body);

        if (!productById) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({message: 'Product deleted successfully!'});
    }catch (error){
        res.status(500).json({message:error.message})
    }
}


module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}