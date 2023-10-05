const {userAuthController} = require ("../../http/controllers/user/auth/auth.controller")
const router = require("express").Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP 
 */
 
/**
 * @swagger
 *  tags:
 *      -name : User-Authentication
 *      description : user-auth section
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: one time password(otp) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                       schema: 
 *                           $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                       schema: 
 *                           $ref: '#/components/schemas/GetOTP'
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
router.post("/get-otp", userAuthController.getOtp)
/**
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags : [User-Authentication]
 *          summary: chack-otp value in user controller
 *          description: chack otp with codce- mobile and expires date
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.post("/check-otp", userAuthController.checkOtp)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags : [User-Authentication]    
 *          summary: send refresh token
 *          description: new token
 *          parameters:
 *              -   in: formData
 *                  type: string 
 *                  required: true
 *                  name: refreshToken
 *          responses:
 *              200:
 *                  description: Success
 * 
 */
router.post("/refresh-token", userAuthController.refreshToken)



module.exports ={
    userAuthRoutes : router
}
