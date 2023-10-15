const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router()

router.put("/add", ChapterController.addChapter) //create new chapter
router.get("/list/:courseID", ChapterController.chaptersOfCourse) //get chapter,
router.patch("/remove/:chapterID", ChapterController.removeChapterById) //remove chapter

module.exports ={
AdminApiChapterRouter: router
}