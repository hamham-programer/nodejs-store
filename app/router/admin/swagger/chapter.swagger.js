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
 *      chaptersOfCourseDefinitions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              -id:
 *                                  type: string
 *                                  example: 6565956822646465656546545
 *                              title:
 *                                  type: string
 *                                  example: title of course
 *                              chapter:
 *                                  type: array
 *                                  items: 
 *                                      type: object
 *                                  example: [{}]
 */
/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [chapter(AdminPanel)]
 *          summary: create new chapter for Courses
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"     
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddChapter"  
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinitions'                  
 */
/**
 * @swagger
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [chapter(AdminPanel)]
 *          summary: get chapter of Courses
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/chaptersOfCourseDefinitions'                  
 */
/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [chapter(AdminPanel)]
 *          summary: remove a Chapter of courses
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */
