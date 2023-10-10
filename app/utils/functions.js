const createError = require("http-errors")
const JWT = require("jsonwebtoken")
const {UserModel} = require("../models/users")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = require("./constans")
const redisClient = require("../utils/init_redis")
const fs = require("fs")
const path = require("path")

function RandomNumberGenrator() {
    return Math.floor((Math.random()*90000) +10000)
}

function SiginAccesToken(userId) {
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            userId: user._id
        };
        const secret = "";
        const options = {
            expiresIn:"1h"
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) =>{
            if(err) reject(createError.InternalServerError("خطای سرور"))
            resolve(token)
        })
    })    
}

function SiginrefreshToken(userId) {
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            userId: user._id
        };
        const secret = "";
        const options = {
            expiresIn:"1y"
        };
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options,async(err, token) =>{
            if(err) reject(createError.InternalServerError("خطای سرور"))
            //ذخیره کردن داخل ردیس
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token);//ذخیره کردن در ردیس بصورت ثانیه هست

            
            resolve(token)
        })
    })    
}
function VerifyrefreshToken(token) {
        return new Promise ((resolve, reject) =>{
            JWT.verify(token,REFRESH_TOKEN_SECRET_KEY,async(err,payload) =>{
                if(err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید "))
                console.log("helllllll");
                const {mobile} = payload || {}
                const user = await UserModel.findOne({mobile}, {password:0, otp:0,bils:0}) 
                if(!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"))
                const refreshToken = await redisClient.get(String(user?._id || "key-default"));
                if(!refreshToken)  reject(createError.Unauthorized("مجدد وارد حساب کاربری خود شوید"))
                if(token === refreshToken) return resolve(mobile)
                reject(createError.Unauthorized("مجدد وارد حساب کاربری خود شوید"))
            })
        })
    }
 function deleteFileInPublic(fileAddress ) {
    if(fileAddress){
        const pathfile = path.join(__dirname,"..","..", "public", fileAddress)
       if(fs.existsSync(pathfile))   fs.unlinkSync(pathfile)
    }
 }
 function ListOfImagesFromRequest (files, fileUploadPath){
    if(files?.length > 0){
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/gi, "/")))
    }else {
        return []
    }
 }
 function deleteInvalidPropertyInObject(data = {}, blackListField = []) {
    const nulishData = ["", " ", "0", null, undefined]
    Object.keys(data).forEach(key =>{
        if(blackListField.includes(key)) delete data[key]
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length>0) data[key] = data[key].map(item => item.trim())
        if(Array.isArray(data[key]) && data[key].length ===0) delete data[key] 
        if(nulishData.includes(data[key])) delete data[key]
    })
 }
 function copyObject(object) {
    return JSON.parse(JSON.stringify(object))
 }
 function setFeatures(body) {
    const {colors, width,weight,length,height} = body
    let features = {}
    if(!isNaN(+width) || !isNaN(+weight) || !isNaN(+height) || !isNaN(+length) ){
        if(!width)  features.width = 0
        else features.width = +width
        if(!weight) features.weight = 0
        else features.weight = +weight
        if(!height) features.height = 0
        else features.height = +height
        if(!length) features.length = 0
        else features.length = +length
    }
    return features
    
 }

module.exports ={
    RandomNumberGenrator,
    SiginAccesToken,
    SiginrefreshToken,
    VerifyrefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertyInObject
}