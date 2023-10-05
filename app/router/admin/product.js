const {productController}= require("../../http/controllers/admin/product.controller")
const router = require("express").Router()

router.post("/", productController.addProduct),
router.patch("/", productController.editProduct),
router.delete("/", productController.removeProduct),
router.get("/", productController.getAllProducts),
router.get("/", productController.getOneProducts)

module.exports = {
    AdminApiProductRouter : router
}