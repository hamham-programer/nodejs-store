const { default: getVideoDurationInSeconds} = require("get-video-duration")
const Controller = require("../../controller")
const {CourseModel} = require("./../../../../models/course")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const {createEpisodesSchema} = require("../../../validators/admin/course.schema")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")
const {getTime} = require("../../../../utils/functions")
const path = require("path")

class EpisodesController extends Controller {
    async addNewEpisodes(req,res,next){
        try {
            const {title, text,type, courseID, chapterID, filename, fileUploadPath} = await createEpisodesSchema.validateAsync(req.body)
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g , "/")
            const videoUrl = `${process.env.BASE_URL}: ${process.env.APPLICATION_PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl)
            const time = getTime(seconds)
            const episode = {title, text, type, time, videoAddress}
            const CreateEpisodeResult = await CourseModel.updateOne({_id:courseID, "chapters._id" : chapterID}, {
                $push: {
                    "chapters.$.episodes" : episode
                }
            })
            if(createEpisodesSchema.modifiedCount == 0) throw new createError.InternalServerError("افزودن اپیزود انجام نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "افزودن ایپزود با موفقیت انجام شد"
                }    

            })
        } catch (error) {
            next(error)
            
        }
    }

}
module.exports = {
    EpisodesController: new EpisodesController()
}