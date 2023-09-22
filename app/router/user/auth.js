const {userAuthController} = require ("../../http/controllers/user/auth/auth.controller")
const router = require("express").Router()

router.post("/login", userAuthController.Login)

module.exports ={
    userAuthRoutes : router
}
