const {AdminBlogController}= require("../../http/controllers/admin/blogs.controller")
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");
const router = require ("express").Router()
/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjIzMTk4MiwiZXhwIjoxNjk2MjM1NTgyfQ.8qkbWnaFGNlOVSnlTcLg8ewhC7qD6wmuSZ3Fy8hDkMw
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success                 
 */
router.get("/", AdminBlogController.getListOfBlogs)
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(Admin-Panel)]
 *          summary: create blogs document
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjIzMTk4MiwiZXhwIjoxNjk2MjM1NTgyfQ.8qkbWnaFGNlOVSnlTcLg8ewhC7qD6wmuSZ3Fy8hDkMw
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string 
 *                  required: true   
 *              -   in: formData
 *                  name: text
 *                  type: string 
 *                  required: true   
 *              -   in: formData
 *                  name: short_text
 *                  type: string  
 *                  required: true   
 *              -   in: formData
 *                  name: title
 *                  type: string  
 *                  required: true   
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string 
 *              -   in: formData
 *                  name: category
 *                  type: string  
 *                  required: true
 *              -   in: formData
 *                  name: image
 *                  type: file  
 *                  required: true      
 *          responses:
 *              201:
 *                  description: success created                
 */
router.post("/add",uploadFile.single("image"),stringToArray("tags"), AdminBlogController.createBlog)
module.exports ={
    BlogAdminApiRoutes: router
}