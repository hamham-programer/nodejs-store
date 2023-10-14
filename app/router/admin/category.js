const {categoryController}= require("../../http/controllers/admin/category.controller")
const router = require("express").Router()

router.post("/add", categoryController.addCategory)

router.get("/parents",categoryController.getAllParents)

router.get("/children/:parent",categoryController.getChildOfParents)

router.get("/parents",categoryController.getAllParents)

router.get("/all",categoryController.getAllCategory)

router.delete("/remove/:id",categoryController.removeCategory)

router.get("/list-of-all",categoryController.getAllCategorywithoutPopulate)

router.get("/:id",categoryController.getCategoryById)

router.patch("/update/:id",categoryController.editCategory)

module.exports ={
    AdminApiCategoryRouter: router
}