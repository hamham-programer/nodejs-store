const createError = require("http-errors")
const JWT = require("jsonwebtoken")
const {UserModel} = require("../models/users")
const { ACCESS_TOKEN_SECRET_KEY} = require("./constans")

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

module.exports ={
    RandomNumberGenrator,
    SiginAccesToken
}