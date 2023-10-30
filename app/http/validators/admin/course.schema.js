const Joi = require("@hapi/joi")
const createError = require("http-errors")

const {MongoIdPattern} = require("../../../utils/constans")
const createCourseSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمی باشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمی توانند بیشتر از بیست مورد باشند")),
    category: Joi.string().regex(MongoIdPattern).error(createError.BadRequest("دسته بندی موردنظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    type: Joi.string().regex(/(free|cash|special)/i),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.PNG)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()

});
const createEpisodesSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دوره صحیح نمی باشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterID: Joi.string().regex(MongoIdPattern).error(createError.BadRequest("شناسه فصل صحیح نمی باشد")),
    courseID: Joi.string().regex(MongoIdPattern).error(createError.BadRequest("شناسه دوره صحیح نمی باش")),
    filename: Joi.string().regex(/(\.mp4|\.mpg|\.avi|\.mkv|\.mov)$/).error(createError.BadRequest("ویدیو ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()
});

module.exports ={
    createCourseSchema,
    createEpisodesSchema
    
}

