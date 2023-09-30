const Controller = require("../controller")
const {categoryModel} = require("./../../../models/categories")
const createError = require("http-errors")
const {addCategorySchema, updateCategorySchema} = require("../../validators/admin/category.Schema")
const mongoose = require ("mongoose")

class categoryController extends Controller {
    async addCategory(req,res,next){
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title,parent} = req.body
            const category = await categoryModel.create({title, parent})
            if(!category) throw createError.InternalServerError("خطایی در سمت سرور رخ داده است")
            return res.status(201).json({
                data:{
                    statusCode:201,
                    message: "دسته بندی با موفقیت ایجاد شد"
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async checkExistCategory(id){
            const category = await categoryModel.findById(id)
            if(!category) createError.NotFound("دسته بندی یافت نشد")
            return category
    }
/*     async removeCategory(req,res,next){
        try {
            const {id} = req.params
            const category = await this.checkExistCategory(id)
            const categoryResult = await categoryModel.deleteOne({_id: category._id})
            if(categoryResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد")
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message:"حذف دسته بندی با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    } */
    async removeCategory(req,res,next){
        try {
            const {id} = req.params
            const category = await this.checkExistCategory(id)
            const categoryResult = await categoryModel.deleteMany({
                $or:[
                    {_id: category._id},
                    {parent: category._id}
                ]
            })

            if(categoryResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی انجام نشد")
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message:"حذف دسته بندی با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async editCategory(req,res,next){
        try {
            const {id} = req.params
            const {title} = req.body
            const category = await this.checkExistCategory(id)
            await updateCategorySchema.validateAsync(req.body)
            const resultOfUpdate = await categoryModel.updateOne({_id:id}, {$set: {title}})
            if(resultOfUpdate.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(200).json({
                data:{
                    statusCode: 200,
                     message:"بروزرسانی با موفقیت  انجام شد"
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async getAllCategory(req,res,next){
        try {
/*             const category = await categoryModel.aggregate([
                {
                    $lookup : {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },{
                    $project:{
                        __v: 0,
                        "children.__v":0,
                        "children.parent":0
                    }
                },
                {
                    $match:{
                        parent: undefined
                    }
                }
            ]) */
/*             const category = await categoryModel.aggregate([
                {
                    $graphLookup : {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent",
                        maxDepth: 5,
                        depthField: "depth",
                        as: "children"
                    }
                },{
                    $project:{
                        __v: 0,
                        "children.__v":0,
                        "children.parent":0
                    }
                },
                {
                    $match:{
                        parent: undefined
                    }
                }
            ]) */
            const category = await categoryModel.find({parent:undefined})
            return res.status(200).json({
                data:{
                    statusCode:200,
                    category
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async getCategoryById(req,res,next){
        try {
            const {id:_id} = req.params
            const category = await categoryModel.aggregate([
                {
                  
                    $match: { _id:new mongoose.Types.ObjectId(_id) }
                },
                {
                    $lookup : {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },{
                    $project:{
                        __v: 0,
                        "children.__v":0,
                        "children.parent":0
                    }
                }
               
            ]) 
            return res.status(200).json({
                data:{
                    statusCode:200,
                    category
                }
            })   
            
        } catch (error) {
            next(error)
            
        }
    }
    async getAllParents(req,res,next){
        try {
            const parents = await categoryModel.find({parent: undefined})
            return res.status(200).json({
                data: {
                    statusCode:200,
                    parents
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async getChildOfParents(req,res,next){
        try {
            const {parent} = req.params
            const children = await categoryModel.find({parent},{__v:0, parent:0}) //پروجکشن براش ست میکنیم بعضی موارد رو نمایش نده 
            return res.status(200).json({
                data:{
                    statusCode:200,
                    children
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }
    async getAllCategorywithoutPopulate(req,res,next){
        try {
            const categories = await categoryModel.aggregate([{
                $match:{}
            }])
            return res.status(200).json({
                data:{
                    statusCode:200,
                    categories
                }
            })
            
        } catch (error) {
            next(error)
            
        }
    }

}
module.exports ={
    categoryController: new categoryController()
}