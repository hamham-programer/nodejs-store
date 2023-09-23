const {userAuthController} = require ("../../http/controllers/user/auth/auth.controller")
const router = require("express").Router()
/* *
 * @swagger
 *  tags:
 *      -name : User-Authentication
 *      description : user-auth section
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: one time password(otp) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Succsee    
 *              400:
 *                  description : Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal server error
 */
router.post("/login", userAuthController.Login)

module.exports ={
    userAuthRoutes : router
}
