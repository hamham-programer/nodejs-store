const { default: getVideoDurationInSeconds} = require("get-video-duration")
const Controller = require("../../controller")
const {CourseModel} = require("./../../../../models/course")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const {createEpisodesSchema} = require("../../../validators/admin/course.schema")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")
const {getTime} = require("../../../../utils/functions")
const path = require("path")
const {ObjectIdValidator} = require("../../../validators/public.validator");
const { deleteInvalidPropertyInObject} = require("../../../../utils/functions");

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
    async removeEpisodes(req,res,next){
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({id:req.params.episodeID})
            await this.getOneEpisode(episodeID)
            const removeEpisodeResult = await CourseModel.updateOne(
                {"chapters.episodes._id" : episodeID}, {
                $pull: {
                    "chapters.$.episodes" : {
                        _id: episodeID 
                    }
                }
            })
            if(removeEpisodeResult.modifiedCount == 0) throw new createError.InternalServerError("حذف اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف ایپزود با موفقیت انجام شد"
                }    

            })
        } catch (error) {
            next(error)
            
        }
    }


    async updateEpisode(req, res, next) {
        try {
             const {episodeID} = req.params
            const episode = await this.getOneEpisode(episodeID)
            const { filename, fileUploadPath } = req.body
            let blackListFields = ["_id"]
            if(filename && fileUploadPath){
                const fileAddress = path.join(fileUploadPath, filename)
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
                const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
                blackListFields.push("filename")
                blackListFields.push("fileUploadPath")
            }else{
                blackListFields.push("time")
                blackListFields.push("videoAddress")
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data, blackListFields)
            const newEpisode = {
                ...episode,
                ...data
            }
            const editEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $set: {
                    "chapters.$.episodes": newEpisode
                }
            })
            if (!editEpisodeResult.modifiedCount)
                throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOneEpisode(episodeID){
        const course = await CourseModel.findOne({"chapters.episodes._id": episodeID}, {
            "chapters.$.episodes": 1
        })
        if(!course) throw new createHttpError.NotFound("اپیزودی یافت نشد")
        const episode = await course?.chapters?.[0]?.episodes?.[0]
        if(!episode) throw new createHttpError.NotFound("اپیزودی یافت نشد")
        return copyObject(episode)
    }
} 
module.exports = {
    EpisodesController : new EpisodesController()
}