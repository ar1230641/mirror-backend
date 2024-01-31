const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
    .post("/newproduct", productController.newProduct)
    .put("/editProduct/:id", productController.editProduct)
    .get("/allProduct/", productController.getAllProduct)
    .get("/oneProduct/:id", productController.oneProduct)
    .delete("/deleteProduct/:id", productController.deleteProduct)



module.exports = router;
