const {categoryController}= require("../../http/controllers/admin/category.controller")
const router = require("express").Router()
/**
 * @swagger
 *  /admin/category/add/:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success        
 */
router.post("/add", categoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of category
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/parents",categoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of category
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/children/:parent",categoryController.getChildOfParents)

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all children of category
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/parents",categoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all category
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/all",categoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: remove category by id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id 
 *          responses:
 *              201:
 *                  description: success
 */
router.delete("/remove/:id",categoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: find category by id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id 
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/:id",categoryController.getCategoryById)
module.exports ={
    categoryRoutes: router
}