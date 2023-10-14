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
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: interger
 *                                      example: 20
 *                                  studendtCount:
 *                                      type: integer
 *                                      example: 340
 *                                  teacher:
 *                                      type: string
 *                                      example: "hamidreza sh"
 */
/**
 * @swagger
 *  definitions:
 *      publicDefinitions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 6542368989832146566876
 *                  title:
 *                      type: string
 *                      example: Chapter1
 *                  text:
 *                      type: string
 *                      example:  the describe about this chapter
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
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save Course
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Courses"
 *          responses:
 *              201:
 *                  description: create new Courses  
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinitions" 
 */
/**
 * @swagger
 *  /admin/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course text, title, short_text
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */
/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]  
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

