const {Router} = require("express")
const router = Router()
const Course = require("../models/course")

router.get("/",async(req,res) => {
    const courses = await Course.getAll()
    res.render("courses",{
        title:"Courses",
        isCourses:true,
        courses
    })
})

router.get("/:id",async(req,res) => {
    try {
        const course = await Course.getById(req.params.id)
        res.render("course",{
            title:course.title,
            course
        })
    } catch (error) {
        console.log(error)
    }
   
})

module.exports =  router