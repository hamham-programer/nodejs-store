const Controller = require("../controller")
const {createBlogSchema} = require("../../validators/admin/blog.schema")
const {deleteFileInPublic} = require("../../../utils/functions")
const {BlogModel} = require("./../../../models/blogs")
const createError = require("http-errors")
const {StatusCodes:HttpStatus} = require("http-status-code")
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
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode: HttpStatus.CREATED,
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
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode:HttpStatus.OK,
                    blog
                }
            })

            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode: HttpStatus.CREATED,
                    
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
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
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
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode:HttpStatus.OK,
                    message: "مقاله با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)            
        }
    }
    async updateBlogById(req,res,next){
            try {
                const {id} = req.params
                await this.findBlog(id)
                if(req?.body.fileUploadPath && req?.body.filename){
                    req.body.image = (path.join(req.body.fileUploadPath, req.body.filename)).replace(/\\/gi, "/")
                    const image = req.body.image
                }
                const data = req.body
                const nulishData = ["", " ", "0", null, undefined]
                let blackListField = ["bookmarks", "dislikes", "likes","comments", "author"]

                Object.keys(data).forEach(key =>{
                    if(blackListField.includes(key)) delete data[key]
                    if(typeof data[key] == "string") data[key] = data[key].trim();
                    if(Array.isArray(data[key]) && Array.length>0) data[key] = data[key].map(item => item.trim())
                    if(nulishData.includes(data[key])) delete data[key]
                })
                const updateResult = await BlogModel.updateOne({_id:id}, {$set: data})
                if(updateResult.modifiedCount == 0) throw createError.InternalServerError("بروزرسانی انجام نشد")
                return res.status(HttpStatus.CREATED).json({
                    data:{
                        statusCode: HttpStatus.CREATED,
                        message: "بروزرسانی بلاگ با موفقیت انجام شد"
                    }
    
                })
                
            } catch (error) {
                deleteFileInPublic(req?.body?.image)
                next(error)            
            }
       
    }
}

module.exports ={
    AdminBlogController: new blogController()
}