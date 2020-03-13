const uuid = require("uuid/v5")
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
    static async  getById(id){
        const courses = await Course.getAll()
        console.log(courses[0])
        return  courses.find(c => c.id === id)
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
    
}

module.exports = Course