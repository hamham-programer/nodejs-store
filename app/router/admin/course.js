const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router()
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types: 
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special             
 *          Status: 
 *              type: boolean
 *              enum:
 *                  -   true
 *                  -   false          
 */ 
/**
 * @swagger
 *  components:
 *      schemas:
 *          Courses:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: String
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: String
 *                      description: the short_text of product
 *                      example: متن توضیحات 
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: متن توضیحات کامل دوره
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: "#/components/schemas/Types"
 */
/**
 * @swagger
 *  /admin/Courses/add:
 *      post:
 *          tags: [Course(Adminpanel)]
 *          summary: create and save Courses
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Courses"
 *          responses:
 *              201:
 *                  description: create new Courses   
 */
router.post("/add",uploadFile.single("image"),stringToArray("tags"), CourseController.addCourse),
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(Adminpanel)]  
 *          summary: get All list of course
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in courses(text, title , short_text)
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list", CourseController.getListOfCourse) //get all course
/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(Adminpanel)]  
 *          summary: get one course by Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: find course by id
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", CourseController.getCourseById) //get one course

module.exports = {
    AdminApiCourseRouter : router
}