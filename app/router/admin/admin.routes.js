
const {AdminApiCategoryRouter}= require("./category")
const {AdminApiBlogtRouter}= require("./blog")
const {AdminApiProductRouter}= require("./product")

const {VerifyAccessToken} = require("../../http/middlewares/verifyAccessToken")

const router = require("express").Router()
/**
 * @swager
 *  tags:
 *      -    name: Admin-Panel
 *           description: action of admin(add-remove, edit, ...)
 *      -    name: product(Adminpanel) 
 *           description: managment product routes     
 *      -    name: Category(AdminPanel)
 *           description: all method and routes about category section
 *      -    name: Blog(AdminPanel)
 *           description: make blog managment admin panel
 */
router.use("/products", AdminApiProductRouter)
router.use("/category", AdminApiCategoryRouter),
router.use("/blogs", AdminApiBlogtRouter)

module.exports = {
    AdminRoutes: router
}