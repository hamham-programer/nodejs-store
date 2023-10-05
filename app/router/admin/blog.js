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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjQwMjI5NywiZXhwIjoxNjk2NDA1ODk3fQ.q8JAe8pmu1DccgHKfNakwLdQRYJl5Gt2_8oSADxMgHc
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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjQwMjI5NywiZXhwIjoxNjk2NDA1ODk3fQ.q8JAe8pmu1DccgHKfNakwLdQRYJl5Gt2_8oSADxMgHc
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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjQwMjI5NywiZXhwIjoxNjk2NDA1ODk3fQ.q8JAe8pmu1DccgHKfNakwLdQRYJl5Gt2_8oSADxMgHc
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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjQwMjI5NywiZXhwIjoxNjk2NDA1ODk3fQ.q8JAe8pmu1DccgHKfNakwLdQRYJl5Gt2_8oSADxMgHc
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
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(Admin-Panel)]
 *          summary: update blogs document by id
 *          consumes:
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  example: Bearer <token>
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NjQwMjI5NywiZXhwIjoxNjk2NDA1ODk3fQ.q8JAe8pmu1DccgHKfNakwLdQRYJl5Gt2_8oSADxMgHc
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string 
 *              -   in: path
 *                  name: id
 *                  type: string 
 *                  required: true
 *              -   in: formData
 *                  name: text
 *                  type: string 
 *              -   in: formData
 *                  name: short_text
 *                  type: string   
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string 
 *              -   in: formData
 *                  name: category
 *                  type: string  
 *              -   in: formData
 *                  name: image
 *                  type: file  
 *          responses:
 *              201:
 *                  description: success created                
 */
router.patch("/update/:id",uploadFile.single("image"),stringToArray("tags"), AdminBlogController.updateBlogById)
module.exports ={
    BlogAdminApiRoutes: router
}