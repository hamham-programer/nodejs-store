const { EpisodesController } = require("../../http/controllers/admin/course/episodes.controller");
const {uploadVideo} = require("../../utils/multer")

const router = require("express").Router()
router.post("/add", uploadVideo.single("video"),EpisodesController.addNewEpisodes)


module.exports ={
    AdminApiEpisodesRouter : router
}