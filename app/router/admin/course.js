const { CourseController } = require("../../http/controllers/admin/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToarray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router()

router.post("/add",uploadFile.single("image"),stringToArray("tags"), CourseController.addCourse),
router.get("/list", CourseController.getListOfCourse) //get all course
router.get("/:id", CourseController.getCourseById) //get one course
router.put("/add-chapter", CourseController.addChapter) //get one course

module.exports = {
    AdminApiCourseRouter : router
}