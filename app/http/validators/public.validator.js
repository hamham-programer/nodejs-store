/* const Joi = require("@hapi/joi")
const { MongoIdPattern } = require("../../utils/constans");
const createError = require("http-errors")

const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIdPattern).error(new Error(createError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})
module.exports = {
    ObjectIdValidator
}
 */

const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIdPattern } = require("../../utils/constans");
const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIdPattern).error(createHttpError.BadRequest(new createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})
module.exports = {
    ObjectIdValidator
}