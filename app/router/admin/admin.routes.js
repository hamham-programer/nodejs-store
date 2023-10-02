
const {categoryRoutes}= require("./category")
const {BlogAdminApiRoutes}= require("./blog")
const {VerifyAccessToken} = require("../../http/middlewares/verifyAccessToken")

const router = require("express").Router()
/**
 * @swager
 *  tags:
 *      -    name: Admin-Panel
 *           description: action of admin(add-remove)
 *      -    name: Category(Admin-Panel)
 *           description: all method and routes about category section
 *      -    name: Blog(Admin-Panel)
 *           description: make blog managment admin panel
 */
router.use("/category", categoryRoutes),
router.use("/blogs",VerifyAccessToken, BlogAdminApiRoutes)


module.exports = {
    AdminRoutes: router
}