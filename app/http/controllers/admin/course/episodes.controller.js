const Controller = require("../../controller")
const {CourseModel} = require("./../../../../models/course")
const {StatusCodes:HttpStatus} = require("http-status-codes")
const {createEpisodesSchema} = require("../../../validators/admin/course.schema")
const createError = require("http-errors")
const {default: mongoose} = require("mongoose")
const path = require("path")

class EpisodesController extends Controller {
    async addNewEpisodes(req,res,next){
        try {
            const {title, text, courseID, chapterID} = await createEpisodesSchema.validateAsync(req.body)
        } catch (error) {
            next(error)
            
        }
    }

}
module.exports = {
    EpisodesController: new EpisodesController()
}