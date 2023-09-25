const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const { ACCESS_TOKEN_SECRET_KEY} = require("../../utils/constans");
const {UserModel} = require("../../models/users");


function VerifyAccessToken(req,res,next) {
    const headers = req.headers
    //console.table(headers)
    const [bearer, token] = headers?.["access-token"]?.split(" ") || []
    console.log(bearer,token);
    if(token && ["Bearer", "bearer"].includes(bearer)){
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload) =>{
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید "))
            console.log("helllllll");
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password:0, otp:0,bils:0}) 
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"))
            req.user =user
        console.log(req.user);
            return next()
        })
    }
    else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))    
  }
  
module.exports ={
    VerifyAccessToken
}