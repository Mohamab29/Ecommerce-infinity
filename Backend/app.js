const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
require("dotenv/config");
const productsController = require("./controllers-layer/products-controller");

server.use(cors());
server.use(express.json());
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db")
    });
server.use('/api/products', productsController);
server.listen(3001, () => console.log("Listening on port 3001 ..."));








