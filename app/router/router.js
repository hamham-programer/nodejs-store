const redisClient = require("../utils/init_redis")
const {HomeRoutes} = require("./api");
const {userAuthRoutes} = require("./user/auth");
const {DeveloperRoutes} = require("./developer.routes");
const {AdminRoutes} = require("./admin/admin.routes");
const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
(async() =>{
    redisClient.set("key","value")
    const value = await redisClient.get("key")
    console.log(value);
})()

const router = require("express").Router()
router.use("/user", userAuthRoutes)
router.use("/admin", VerifyAccessToken,checkRole("ADMIN"), AdminRoutes)
router.use("/developer", DeveloperRoutes)
router.use("/", HomeRoutes)
module.exports ={
    AllRoutes: router
}