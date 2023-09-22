const {authSchema} = require("../../../validators/user/auth.schema")
const createError = require("http-errors")
 class userAuthController{
    async Login(req,res,next){
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).send("ورود شما با موفقیت انجام شد")

        } catch (error) {
            next(createError.BadRequest(error.message))
            
        }
    }
}
module.exports ={
    userAuthController : new userAuthController()
}