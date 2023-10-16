const Controller = require("../../controller")
const {AbstractCourseController} = require("./course.controller")
const {CourseModel} = require("./../../../../models/course")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const {deleteInvalidPropertyInObject} = require("../../../../utils/functions")

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
/*     async removeChapterById(req,res,next){
        try {
            const {chapterID} =req.params
            const chapter = await this.getOneChapter(chapterID)
            console.log(chapter);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id": chapterID},{
                $pull: {
                    chapters: {
                        _id : chapterID
                    }
                }
            })
            if(removeChapterResult.modifiedCount == 0 ) throw new createError.InternalServerError("حذف فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    message:"حذف فصل با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)
            
        }

    } */
    async removeChapterById(req, res, next){
        try {
            const {chapterID} = req.params
            await this.getOneChapter(chapterID);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id": chapterID}, {
                $pull : {
                    chapters : {
                        _id : chapterID
                    }
                }
            })
            if(removeChapterResult.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    message: "حذف فصل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapterById(req,res,next){
        try {
            const {chapterID} = req.params
            await this.getOneChapter(chapterID)
            const data = req.body
            deleteInvalidPropertyInObject(data,["_id"])          
            const updateChapterResult = await CourseModel.updateOne({"chapters._id" : chapterID},{
                $set:{
                    "chapters.$" : data
                }
            })
            if(updateChapterResult.modifiedCount == 0) throw new createError.InternalServerError("بروزرسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    message:"بروزرسانی با موفقیت انجام شد"
                }
            })
            
        } catch (error) {
            next(error)            
        }
    }
    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createError.BadRequest("شناسه صحیح نمی باشد")
        const course = await CourseModel.findById(id)
        if(!course) throw createError.NotFound("دوره ای یافت نشد")
        return course
    
    }
    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id": id}, {"chapters.$": 1})
        if(!chapter) throw createError.NotFound("فصلی با این شناسه یافت نشد")
        return chapter
    }
}
module.exports ={
    ChapterController: new ChapterController()
}