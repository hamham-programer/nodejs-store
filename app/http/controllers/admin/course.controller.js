const Controller = require("../controller")
const {CourseModel} = require("./../../../models/course")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const {createCourseSchema} = require("../../validators/admin/course.schema")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")

const path = require("path")
class CourseController extends Controller{
    async getListOfCourse(req,res,next){
        try {
            const {search} = req.query
            let courses
            if(search) courses = await CourseModel.find({$text : {$search: search}}).sort({_id: -1}) //سورت شده از اول به آخر
            else courses = await CourseModel.find({}).sort({_id: -1})
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode: HttpStatus.OK,
                    courses
                }
            })
        } catch (error) {
            next(error)
            
        }
    }
    async addCourse(req,res,next){
        try {
            await createCourseSchema.validateAsync(req.body)
            const {fileUploadPath,filename} = req.body
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const {title,text,short_text,category,tags,type,price,discount} = req.body
            const teacher =  req.user._id
            if(Number(price) > 0 && type === "free") throw createError.BadRequest("برای دوره رایگان نمیتوان قیمت تعیین کرد")
            const course = await CourseModel.create({
                title,
                text,
                short_text,
                category,
                tags,
                type,
                price,
                discount,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher
            })
            if(!course?._id) throw createError.InternalServerError("دوره ثبت نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data:{
                    message: "دوره با موفقیت افزوده شد"
                }                
            })
            
        } catch (error) {
            next(error)   
            console.log(error);         
        }
    }

    async getCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id) ;
            if(!course) throw createHttpError.NotFound("دوره ای یافت نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req,res,next){
        try {
            const {id} = req.params
            const course = await CourseModel.findById(id)
            if(!course) throw createError.NotFound("دوره ای یافت نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    course
                }
            })
            
        } catch (error) {
            next(error)            
        }
    }
    async addChapter(req,res,next){
        try {
            const {title, text, id} = req.body
            await this.findCourseById(id)
            const saveChapter = await CourseModel.updateOn({_id: id}, {$push: {
                Chapter:{title, text, episodes: []}
            }})
            if(saveChapter.modifiedCount === 0) throw createError.InternalServerError("فصل افزوده نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data:{
                    message: "فصل با موفقیت افزوده شد"
                }
            })


            
        } catch (error) {
            next(error)  
            console.log(error);
          
        }
    }
    async findCourseById(id){
        try {
            if(!mongoose.isValidObject(id)) throw createError.BadRequest("شناسه صحیح نمی باشد")
            const course = await CourseModel.findById(id)
            if(!course) throw createError.NotFound("دوره ای یافت نشد")
            return course
            
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = {
    CourseController: new CourseController()
}