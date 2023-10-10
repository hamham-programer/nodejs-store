const Controller = require("../controller")
const {createProductSchema} = require("../../validators/admin/product.schema")
const {deleteFileInPublic,ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject} = require("../../../utils/functions")
const {ObjectIdValidator} = require("../../validators/public.validator")
const {ProductModel} = require("./../../../models/products")
const createError = require("http-errors")
const path = require("path")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const productBlackList ={
    BOOKMARKS : "bookmarks",
    LIKES : "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height"
}
 Object.freeze(productBlackList)//نگهداری از داده ها
class productController extends Controller{
    async addProduct(req, res, next){
        try {
            const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            const ProductBody = await createProductSchema.validateAsync(req.body)
/*             const image = (path.join(ProductBody.fileUploadPath, ProductBody.filename)).replace(/\\/gi, "/")   */     
            const {title, text, short_text, category, tags, count, price,type, discount} = ProductBody  //, width,weight,height,length
            const supplier = req.user._id
            let feture = setFeatures(req.body)

            const product = await ProductModel.create ({title, text, short_text, category, tags, count, price, discount, feture, images, supplier,type })
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode: HttpStatus.CREATED , 
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
            const {id} = req.params
            const product =  await this.findProductById(id)
            const data = copyObject(req.body)
            data.images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
            data.features = setFeatures(req.body)
            //let blackListField = [...object.values(productBlackList)]
            let blackListField = Object.values(productBlackList) //آرایه ای از ولیوها در د داخل بلک لیست می ریزیم
            deleteInvalidPropertyInObject(data, blackListField)
            const updateProductResult = await ProductModel.updateOne({_id: product._id}, {$set: data})
            if (updateProductResult.modifiedCount == 0) throw{status: HttpStatus.INTERNAL_SERVER_ERROR, message: "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    message: "بروزرسانی با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)            
        }
    }

    async removeProductById(req, res, next) {
        try {
          const { id } = req.params;
          const product = await this.findProductById(id)
          const removeProductResult = await ProductModel.deleteOne({_id: product._id})
          if(removeProductResult.deletedCount == 0)  throw createError.InternalServerError("حذف محصول انجام نشد")
          return res.status(HttpStatus.OK).json({
           data : {
                 statusCode:HttpStatus.OK,
               message: "حذف محصول با موفقیت انجام شد"
                }
          })
        } catch (error) {
          next(error);
        }
      }
    async getAllProducts(req, res, next){
        try {
            const search = req?.query?.search || ""
            let products
            if(search){
                products = await ProductModel.find({
                    $text : {
                        $search: search
                    }
                })
            }else{
                products = await ProductModel.find({})
            }
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    products
                }
            })
        } catch (error) {
            next(error)            
        }
    }
    async getOneProduct(req, res, next) {
        try {
          const { id } = req.params;
          const product = await this.findProductById(id)
          return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data : {
              product
            }
          })
        } catch (error) {
          next(error);
        }
      }
      async findProductById(productID) {
        const { id } = await ObjectIdValidator.validateAsync({ id: productID });
        const product = await ProductModel.findById(id);
        if (!product) throw new createError.NotFound("محصولی یافت نشد")
        return product
      }

      
}
module.exports = {
    productController: new productController()
}