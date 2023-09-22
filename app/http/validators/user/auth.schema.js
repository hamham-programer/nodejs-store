/* const Joi = require("@hapi/joi")
const authSchema =  Joi.object({
    email: Joi.string().lowercase().email().trim().required().error(new Error("ایمیل وارد شده صحیح نمی باشد")),
    password: Joi.string().min(6).max(16).trim().error(new Error("پسورد وارد شده صحیح نمی باشد")).required()
})
module.exports ={
    authSchema
} */
const Joi = require("@hapi/joi")
const authSchema =  Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))
})
module.exports ={
    authSchema
}