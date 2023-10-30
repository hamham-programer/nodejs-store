
const {AdminApiCategoryRouter}= require("./category")
const {AdminApiBlogtRouter}= require("./blog")
const {AdminApiProductRouter}= require("./product")
const {AdminApiCourseRouter}= require("./course")
const {AdminApiChapterRouter}= require("./chapter")
const {AdminApiEpisodesRouter}= require("./episodes")

const {VerifyAccessToken} = require("../../http/middlewares/verifyAccessToken")

const router = require("express").Router()
/**
 * @swager
 *  tags:
 *      -    name: AdminPanel
 *           description: action of admin(add-remove, edit, ...)
 *      -    name: Course(AdminPanel)
 *      -    description: managment
 *      -    name: product(Adminpanel) 
 *           description: managment product routes     
 *      -    name: Category(AdminPanel)
 *           description: all method and routes about category section
 *      -    name: Episodes(AdminPanel)
 *           description: all method and routes about category section
 *      -    name: Blog(AdminPanel)
 *           description: make blog managment admin panel  
 */
router.use("/courses", AdminApiCourseRouter),
router.use("/products", AdminApiProductRouter),
router.use("/category", AdminApiCategoryRouter),
router.use("/blogs", AdminApiBlogtRouter),
router.use("/chapter", AdminApiChapterRouter),
router.use("/episode", AdminApiChapterRouter)



module.exports = {
    AdminRoutes: router
}