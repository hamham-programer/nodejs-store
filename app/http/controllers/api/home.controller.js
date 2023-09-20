const Controller = require("../controller")
module.exports = new class HomeController extends Controller{
    indexPge(req,res,next) {
        return res.status(200).send("onepage" + this.TESTMETHOD())
    }
    

}