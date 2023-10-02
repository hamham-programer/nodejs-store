const Controller = require("../controller")
const {createBlogSchema} = require("../../validators/admin/blog.schema")
const {deleteFileInPublic} = require("../../../utils/functions")
const {BlogModel} = require("./../../../models/blogs")
const createError = require("http-errors")

const path = require("path")


class blogController extends Controller{
    async createBlog(req,res,next){
        try {
            const blogDataBody =await createBlogSchema.validateAsync(req.body)
            req.body.image = (path.join(blogDataBody.fileUploadPath, blogDataBody.filename)).replace(/\\/gi, "/")
            const {title, text, short_text, categort, tags} = blogDataBody 
            const image = req.body.image
            const author = req.user._id
            const Blog = await BlogModel.create({title, image, text, short_text, categort, tags, author})
            return res.status(201).json({
                data:{
                    statusCode: 201,
                    message: "ایجاد بلاگ با موفقیت انجام شد"
                }

            })
            
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)            
        }
    }
    async findBlog(id) {
        const blog = await BlogModel.findById(id).populate([{path: "category", select: ["title"]}, {path: "author", select: ["mobile", "first_name", "last_name", "username"]}])
        if(!blog) throw createError.NotFound("مقاله ای یافت نشد")
        
        return blog
    }
    async getOneBlogById(req,res,next){
        try {
            const {id} = req.params
            const blog = await this.findBlog({_id:id})
            return res.status(200).json({
                data:{
                    statusCode:200,
                    blog
                }
            })

            return res.status(201).json({
                data:{
                    statusCode: 201,
                    
                }
            })
            
        } catch (error) {
            next(error)            
        }
    }
    async getListOfBlogs(req,res,next){
        try {
    //        const blogs = await BlogModel.find({})
           const blogs = await BlogModel.aggregate([
                {$match: {}},
                {
                    $lookup:{
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }},
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                       "author.Roles": 0,
                       "author.bills": 0,
                       "author.otp": 0

                    }
                }
        
           ])
            return res.status(200).json({
                data:{
                    statusCode: 200,
                    blogs
                }
            })
            
        } catch (error) {
            next(error)            
        }
    }
    async getCommentsOfBlogs(req,res,next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
    async deleteBlogById(req,res,next){
        try {
            const {id} = req.params
            await this.findBlog(id)
            const result = await BlogModel.deleteOne({_id: id})
            if(result.deleteCount == 0) throw createError.InternalServerError("حذف انجام نشد")
            return res.status(200).json({
                data:{
                    statusCode:200,
                    message: "مقاله با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)            
        }
    }
    async updateBlogById(req,res,next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
}

module.exports ={
    AdminBlogController: new blogController()
}