const { EpisodesController } = require("../../http/controllers/admin/course/episodes.controller");
const {uploadVideo} = require("../../utils/multer")

const router = require("express").Router()
router.post("/add", uploadVideo.single("video"),EpisodesController.addNewEpisodes)
router.delete("/remove/:episodeID",EpisodesController.removeEpisodes)
router.patch("/update/:episodeID", uploadVideo.single("video"), EpisodesController.updateEpisode)

module.exports ={
    AdminApiEpisodesRouter : router
}