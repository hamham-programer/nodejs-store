const Controller = require("../controller")
const {createBlogSchema} = require("../../validators/admin/blog.schema")
const {ProductModel} = require("./../../../models/products")
const createError = require("http-errors")

class productController extends Controller{
    async addProduct(req, res, next){
        try {
            
        } catch (error) {
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