
const {categoryRoutes}= require("./category")
const router = require("express").Router()
/**
 * @swager
 *  tags:
 *      -    name: Admin-Panel
 *           description: action of admin(add-remove)
 *      -    name: Category(Admin-Panel)
 *      -    description: all method and routes about category section
 */
router.use("/category", categoryRoutes)

module.exports = {
    AdminRoutes: router
}