const {categoryController}= require("../../http/controllers/admin/category.controller")
const router = require("express").Router()
/**
 * @swagger
 *  /admin/category/add/:
 *      post:
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *          tags: [Category(Admin-Panel)]
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
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all category without populate and nested structure
 *          responses:
 *              201:
 *                  description: success
 */
router.get("/list-of-all",categoryController.getAllCategorywithoutPopulate)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(Admin-Panel)]
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
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(Admin-Panel)]
 *          summary: edit or update category by id
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id 
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title                
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internalServerError
 */
router.patch("/update/:id",categoryController.editCategory)

module.exports ={
    categoryRoutes: router
}