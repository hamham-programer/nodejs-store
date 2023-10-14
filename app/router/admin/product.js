const {productController}= require("../../http/controllers/admin/product.controller")
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const router = require("express").Router()

router.post("/add",uploadFile.array("images", 10),stringToArray("tags"), productController.addProduct),

router.get("/list", productController.getAllProducts),

router.get("/:id", productController.getOneProduct)

router.delete("/remove/:id", productController.removeProductById)

router.patch("/edit/:id",uploadFile.array("images", 10),stringToArray("tags"), productController.editProduct),

module.exports = {
    AdminApiProductRouter : router
}