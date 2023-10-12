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

module.exports ={
    createCourseSchema,
    
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwMDYzOTY0OCIsInVzZXJJZCI6IjY1MGVjOWEyZTNlZGVlODI0NDk5NmIwNCIsImlhdCI6MTY5NzA5MjYwMCwiZXhwIjoxNjk3MDk2MjAwfQ.prp2yVsMZYrqg0Zc6dIoaYVECosPBwOAxqmK1iukgqk