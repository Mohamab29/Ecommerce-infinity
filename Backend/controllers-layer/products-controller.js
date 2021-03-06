const express = require('express');
const router = express.Router();
const Product = require("../models/Product");


// GET http://localhost:3001/api/products
router.get('/', async (request, response) => {
    try {
        const products = await Product.find();
        response.json(products);

    } catch (error) {
        response.status(500).send(error.message);
    }

});
// GET http://localhost:3001/api/products/:id
router.get('/:id', async (request, response) => {
    try {
        const productId = request.params.id;
        
        const product = await Product.findById(productId).exec();
        response.json(product);

    } catch (error) {
        response.status(500).send(error.message);
    }

});

// GET http://localhost:3001/api/products/image/:imageName
router.get("/image/:imageName", async (request, response) => {
    try {
        const imageName = request.params.imageName;

        const imagePath = "/Images/products-images/" + imageName;

        response.sendFile(imagePath, { root: "./" });
    } catch (error) {
        response.status(500).send(error.message)
    }
});
// POST http://localhost:3001/api/products
router.post('/', async (request, response) => {
    try {

        const product = new Product({
            title: request.body.title,
            details: request.body.details,
            description: request.body.description,
            price: request.body.price,
            imageName: request.body.imageName,
        });
        const addedProduct = await product.save();

        response.status(201).send(addedProduct);

    } catch (error) {
        response.status(500).send(error.message);
    }

});


module.exports = router;
