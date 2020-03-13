const uuid = require("uuid/v4")
const fs = require("fs")
const path = require("path")
class Course {
    constructor(title,price,img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJson(){
        return {
                title:this.title,
                price:this.price,
                img:this.img,
                id:this.id        
              }
    }
    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJson())
        return new Promise((resolve,reject) => {
          fs.writeFile(
                path.join(__dirname,"../data","courses.json"),
                JSON.stringify(courses),
                err => {
                    if(err){reject(err) }
                    else{resolve() }
                }
            )
        })
    }
    static async getAll(){
        return new Promise((resolve,reject) => {
            fs.readFile(
                path.join(__dirname,"..","data","courses.json"),
                "utf-8",
                (err,data) => {
                    if(err) {
                        reject(err)
                    }
                    else{
                        resolve(JSON.parse(data))
                    }
                }
            )
        })
    }
    static async getById(id){
        try {
            const courses = await Course.getAll()
               return courses.find(c=>c.id === id)
        } catch (err) {
            if(err) throw err
        }
    }
    static async update(course){
        const courses = await Course.getAll()
            const idx = courses.findIndex(c =>c.id === course.id)
                courses[idx] = course
            return new Promise((resolve,reject) => {
                fs.writeFile(
                        path.join(__dirname,"../data","courses.json"),
                        JSON.stringify(courses),
                        err => {
                            if(err){reject(err) }
                            else{resolve() }
                        }
                    )
                })

    }
    
}   

module.exports = Course