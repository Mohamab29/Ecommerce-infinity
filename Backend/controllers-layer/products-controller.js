const express = require('express');
const router = express.Router();
const Product = require("../models/Product");


// GET http://localhost:3001/api/products
router.get('/', async (request, response) => {
    try {
        const products = await Product.find()
        response.json(products);

    } catch (error) {
        response.status(500).send(error.message);
    }

});

// POST http://localhost:3001/api/products
router.post('/', async (request, response) => {
    try {

        const product = new Product({
            title: request.body.title,
            subtitle: request.body.subtitle,
            description: request.body.description,
            price: request.body.price
        });
        const addedProduct = await product.save();

        response.status(201).send(addedProduct);

    } catch (error) {
        response.status(500).send(error.message);
    }

});


module.exports = router;
