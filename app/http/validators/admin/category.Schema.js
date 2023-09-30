const Joi = require("@hapi/joi")
const {MongoIdPattern} = require("../../../utils/constans")

const addCategorySchema =  Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی نمیتواند کمتر از سه نویسه و بیشتر از 30 نویسه باشد")),
    parent: Joi.string().allow("").pattern(MongoIdPattern).allow("").error(new Error("شناسه ارسال شده صحیح نمی باشد"))
})
const updateCategorySchema =  Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی نمیتواند کمتر از سه نویسه و بیشتر از 30 نویسه باشد")),
})

module.exports ={
    addCategorySchema,
    updateCategorySchema    
}