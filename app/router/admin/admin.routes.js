
const {categoryRoutes}= require("./category")
const router = require("express").Router()
/**
 * @swager
 *  tags:
 *      name: Admin-Panel
 *      description: action of admin(add-remove)
 */
router.use("/category", categoryRoutes)

module.exports = {
    AdminRoutes: router
}