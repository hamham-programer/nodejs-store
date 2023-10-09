const Joi = require("@hapi/joi")
const createError = require("http-errors")

const {MongoIdPattern} = require("../../../utils/constans")
const createProductSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمی باشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمی توانند بیشتر از بیست مورد باشند")),
    category: Joi.string().regex(MongoIdPattern).error(createError.BadRequest("دسته بندی موردنظر یافت نشد")),
    price: Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    type: Joi.string().regex(/virtual | physical/i),
    count: Joi.number().error(createError.BadRequest("تعداد وارد شده صحیح نمی باشد")),
    discount: Joi.number().error(createError.BadRequest("تخفیف وارد شده صحیح نمی باشد")),
    height: Joi.number().allow(null, 0 , "0").error(createError.BadRequest("ارتفاع وارد شده صحیح نمی باشد")),
    weight: Joi.number().allow(null, 0 , "0").error(createError.BadRequest("وزن وارد شده صحیح نمی باشد")),
    width: Joi.number().allow(null, 0 , "0").error(createError.BadRequest("عرض وارد شده صحیح نمی باشد")),
    length: Joi.number().allow(null, 0 , "0").error(createError.BadRequest("طول وارد شده صحیح نمی باشد")),
    filename: Joi.string().regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif|\.PNG)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath: Joi.allow()

});
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمی باشد")),

})
module.exports ={
    createProductSchema,
    updateCategorySchema
}