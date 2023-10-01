const Controller = require("../controller")
const {createBlogSchema} = require("../../validators/admin/blog.schema")
const {deleteFileInPublic} = require("../../../utils/functions")
const {BlogModel} = require("./../../../models/blogs")

const path = require("path")


class blogController extends Controller{
    async createBlog(req,res,next){
        try {
            const blogDataBody =await createBlogSchema.validateAsync(req.body)
            req.body.image = (path.join(blogDataBody.fileUploadPath, blogDataBody.filename)).replace(/\\/gi, "/")
            const {title, text, short_text, categort, tags} = blogDataBody 
            const {image} = req.body.image
            const Blog = await BlogModel.create({title, image, text, short_text, categort, tags})
            return res.json({blogDataBody, image:req.body.image})
            
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)            
        }
    }
    async getOneBlogById(req,res,next){
        try {
            
        } catch (error) {
            next(error)            
        }
    }
    async getListOfBlogs(req,res,next){
        try {
            return res.status(200).json({
                statusCode: 200,
                data:{
                    blogs: []
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