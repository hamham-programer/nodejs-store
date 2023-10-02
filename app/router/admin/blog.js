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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjI1MTQ5MiwiZXhwIjoxNjk2MjU1MDkyfQ.vMN9UUKNnBD2yw_3qJpwqc-xQEAKYUzTrPQxwQol6Yg
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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjI1MTQ5MiwiZXhwIjoxNjk2MjU1MDkyfQ.vMN9UUKNnBD2yw_3qJpwqc-xQEAKYUzTrPQxwQol6Yg
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
/**
 * @swagger
 *  /admin/blogs/{id}:
 *       get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get blog by id and populate this field
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjI1MTQ5MiwiZXhwIjoxNjk2MjU1MDkyfQ.vMN9UUKNnBD2yw_3qJpwqc-xQEAKYUzTrPQxwQol6Yg
 *                  type: string
 *                  required: true
 *              -   in: path    
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", AdminBlogController.getOneBlogById)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *       delete:
 *          tags: [Blog(Admin-Panel)]
 *          summary: remove blog by id and populate this field
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjI1MTI0OSwiZXhwIjoxNjk2MjU0ODQ5fQ.cW19zwJQZ2YS2B3KbvzLDM_1XLYebfOzV4pgNWHXnQ0
 *                  type: string
 *                  required: true
 *              -   in: path    
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/:id", AdminBlogController.deleteBlogById)
module.exports ={
    BlogAdminApiRoutes: router
}