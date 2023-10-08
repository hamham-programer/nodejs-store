const Controller = require("../controller")
const {createProductSchema} = require("../../validators/admin/product.schema")
const {deleteFileInPublic} = require("../../../utils/functions")
const {ProductModel} = require("./../../../models/products")
const createError = require("http-errors")
const path = require("path")

class productController extends Controller{
    async addProduct(req, res, next){
        try {
            const ProductBody = await createProductSchema.validateAsync(req.body)
            const image = (path.join(ProductBody.fileUploadPath, ProductBody.filename)).replace(/\\/gi, "/")         
            const {title, text, short_text, category, tags, count, price, discount, width,weight,height,length} = ProductBody 
            const supplier = req.user._id
            let feture = {}, type = "physical"
            if(width || weight || height || length ){
                if(!width)  feture.width = 0
                else feture.width = width
                if(!weight) feture.weight = 0
                else feture.weight = weight
                if(!height) feture.height = 0
                else feture.height = height
                if(!length) feture.length = 0
                else feture.length = length
            }else{
                type: "virtual"
            }

            const product = await ProductModel.create ({title, text, short_text, category, tags, count, price, discount, feture, image, supplier,type })
            return res.json({
                data:{
                    statusCode: 200 , 
                    message: "ثبت محصول با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)            
        }
    }
    async editProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
    async removeProduct(req, res, next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
    async getAllProducts(req, res, next){
        try {
            const products = await ProductModel.find({})
            return res.json({
                data:{
                    statusCode: 200,
                    products
                }
            })
        } catch (error) {
            next(error)            
        }
    }
    async getOneProducts(req, res, next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
    
}
module.exports = {
    productController: new productController()
}