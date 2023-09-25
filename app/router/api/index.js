const HomeController = require("../../http/controllers/api/home.controller")
const router = require("express").Router()
const {VerifyAccessToken}= require("../../http/middlewares/verifyAccessToken")
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : index page route and dat
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes 
 *      tags: [IndexPage]
 *      description : get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *              schema: 
 *                  type: string
 *                  example : Index Page Store
 *          404: 
 *              description: not Found
 */
router.get("/",VerifyAccessToken,HomeController.indexPge)
module.exports ={
    HomeRoutes: router
}