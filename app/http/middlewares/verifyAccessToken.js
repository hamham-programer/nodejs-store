const JWT = require("jsonwebtoken")
const createError = require("http-errors")
const { ACCESS_TOKEN_SECRET_KEY} = require("../../utils/constans");
const {UserModel} = require("../../models/users");

function getToken(headers){
    const [bearer, token] = headers?.["access-token"]?.split(" ") || []
    if(token && ["Bearer", "bearer"].includes(bearer)) return token
    throw createError.Unauthorized("حساب کاربری جهت ورود یافت نشد")
}
function VerifyAccessToken(req,res,next) {
    try{
        const token = getToken(req.headers)
            JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload) =>{
                try{
                    if(err) throw (createError.Unauthorized("وارد حساب کاربری خود شوید "))
                console.log("helllllll");
                const {mobile} = payload || {}
                const user = await UserModel.findOne({mobile}, {password:0, otp:0,bils:0}) 
                if(!user) throw (createError.Unauthorized("حساب کاربری یافت نشد"))
                req.user =user
            console.log(req.user);
                return next()
                }catch(error){
                    next(error)
                }
            })
     } catch(error){
        next(error)
    }

  }  
  function checkRole(role){
    return function(req,res,next){
        try{
            const user = req.user
            if(user.Roles.includes(role)) return next()
            throw createError.Forbidden("شما به این آدرس دسترسی ندارید")
        }catch(error){
            next(error)
        }
    }
  }
module.exports ={
    VerifyAccessToken,
    checkRole 
}