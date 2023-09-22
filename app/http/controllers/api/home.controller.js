const createError = require("http-errors")
const {authSchema} = require("../../validators/user/auth.schema")
const Controller = require("../controller")
module.exports = new class HomeController extends Controller{
    async indexPge(req,res,next) {
        try {
        return res.status(200).send("onepage" )
            
        } catch (error) {
            next(createError.BadRequest(error.message))
            
        }
    }
    

}