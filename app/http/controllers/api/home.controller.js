const createError = require("http-errors")
const Controller = require("../controller")
module.exports = new class HomeController extends Controller{
    async indexPge(req,res,next) {
        try {
            return res.status(200).send("Index Page Store");
            
        } catch (error) {
            next(createError.BadRequest(error.message))
            
        }
    }
    

}