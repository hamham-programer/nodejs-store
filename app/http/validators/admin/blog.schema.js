const Joi = require("@hapi/joi")
const createError = require("http-errors")

const {MongoIdPattern} = require("../../../utils/constans")
const createBlogSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.PNG)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمی توانند بیشتر از بیست مورد باشند")),
    category: Joi.string().pattern(MongoIdPattern).error(createError.BadRequest("دسته بندی موردنظر یافت نشد")),
    fileUploadPath: Joi.allow()

});
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),

})
module.exports ={
    createBlogSchema,
    updateCategorySchema
}