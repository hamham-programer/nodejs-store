const HomeController = require("../../http/controllers/api/home.controller")
const router = require("express").Router()
/**
 * @swagger
 * tags:
 * name: indexPge
 * description: indexPge routes
 */
/**
 * @swagger
 * tag: indexPge
 * /:
 *  get:
 *     summary: index of routes
 *     tags: [indexPge]
 *     description: get all need data for index page
 *     responses:
 *          200:
 *              description: success
 *          400:
 *              description: not found
 */
router.get("/",HomeController.indexPge)
module.exports ={
    HomeRoutes: router
}