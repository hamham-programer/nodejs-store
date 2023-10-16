const router = require("express").Router()
const { EpisodesController } = require("../../http/controllers/admin/course/episodes.controller");

router.get("/add", EpisodesController.addNewEpisodes)

module.exports ={
    AdminApiEpisodesRouter : router
}