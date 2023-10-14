const Controller = require("../../controller")
const {AbstractCourseController} = require("./course.controller")
const {CourseModel} = require("./../../../../models/course")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")
const {StatusCodes:HttpStatus} = require("http-status-codes")


//class ChapterController extends AbstractCourseController{
class ChapterController extends Controller{

    async addChapter(req,res,next){
        try {
            const {title, text, id} = req.body
            await this.findCourseById(id)
            const saveChapter = await CourseModel.updateOne({_id: id}, {$push: {
                chapters:{title, text, episodes: []}
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
        }
    }
    async chaptersOfCourse(req,res,next){
        try {
            const {courseID} = req.params
            const corses = await this.getChapterOfCourse(courseID)
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    corses
                }
            })
        } catch (error) {
            next(error)          
        }
    }
    async getChapterOfCourse(id){
        const chapters = await CourseModel.findOne({_id:id}, {chapters: 1, title: 1})
        if(!chapters) throw createError.NotFound("دوره با این شناسه یافت نشد")
        return chapters
    }
    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createError.BadRequest("شناسه صحیح نمی باشد")
        const course = await CourseModel.findById(id)
        if(!course) throw createError.NotFound("دوره ای یافت نشد")
        return course
    
    }
}
module.exports ={
    ChapterController: new ChapterController()
}