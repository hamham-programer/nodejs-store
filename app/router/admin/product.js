const {productController}= require("../../http/controllers/admin/product.controller")
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const router = require("express").Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: String
 *                      description: the title of product
 *                  short_text:
 *                      type: String
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  image:
 *                      type: file
 *                      description: the image of product
 *                  height:
 *                      type: string
 *                      description: the height of product box
 *                  weight:
 *                      type: string
 *                      description: the weight of product box
 *                  width:
 *                      type: string
 *                      description: the with of product box
 *                  length:
 *                      type: string
 *                      description: the length of product box
 */
/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [product(Adminpanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              201:
 *                  description: create new product   
 */
router.post("/add",uploadFile.single("image"),stringToArray("tags"), productController.addProduct),
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [product(Adminpanel)]
 *          summary: get all product
 *          responses:
 *              200:
 *                  description: success  
 */
router.get("/list", productController.getAllProducts)
router.patch("/", productController.editProduct),
router.delete("/", productController.removeProduct),
router.get("/", productController.getAllProducts),
router.get("/", productController.getOneProducts)

module.exports = {
    AdminApiProductRouter : router
}