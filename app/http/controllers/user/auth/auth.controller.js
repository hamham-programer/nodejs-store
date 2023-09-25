const {getOtpSchema,checkOtpSchema} = require("../../../validators/user/auth.schema")
const {RandomNumberGenrator,SiginAccesToken} = require("../../../../utils/functions")
const {UserModel} = require("./../../../../models/users")
const {EXPIRES_IN,USER_ROLE} = require("../../../../utils/constans")
const Controller = require("../../controller")
const createError = require("http-errors")
 class userAuthController extends Controller{
    async getOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body
            const code = RandomNumberGenrator()
            const result =await this.saveUser(mobile,code)
            if(!result) throw createError.Unauthorized("ورود شما انجام نشد")
            return res.status(200).send({
                data:{
                    statusCode: 200,
                    message: "کد اعتبارسنجی با موفقیت برای شماارسال شد",
                    code,
                    mobile
                }
            })

        } catch (error) {
            next(next(error))
            
        }
    }
    async checkOtp(req,res,next){
        try {
            await checkOtpSchema.validateAsync(req.body)
            const {mobile,code} = req.body
            const user = await UserModel.findOne({mobile})
            if(!user)throw createError.NotFound("کاربری یافت نشد")
            if(user.otp.code != code)throw createError.Unauthorized("کد ارسال شده صحیح نمی باشد")
            const now = Date.now()
            if(+user.otp.expiresIn < now)throw createError.Unauthorized("کد شما منقضی شده است")
            const accesstoken = await SiginAccesToken(user._id)
            return res.json({
                data:{
                    accesstoken,
                    user
                }
            })  
            
        } catch (error) {
            next(error)
        }
    }


    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const result = await this.checkExistUser(mobile)
        if(result){
            return (await this.updateUser(mobile,{otp       
            }
            ))
        }
        return (await UserModel.create({
            mobile,
            otp,
            Roles: [USER_ROLE]
        }))
    }
    async checkExistUser(mobile){
        const user= await UserModel.findOne({mobile})
        return !!user

    }
    async updateUser(mobile, objectData= {}){
        Object.keys(objectData).forEach(key =>{
            if(["", " ", NaN, undefined,0, null].includes(objectData[key])) delete  objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile}, {$set: objectData})
        return !!updateResult.modifiedCount
    }
}
module.exports ={
    userAuthController : new userAuthController()
}