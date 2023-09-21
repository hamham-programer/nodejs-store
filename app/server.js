const {AllRoutes} = require("./router/router")
const morgan = require("morgan")
const createError = require("http-errors")
const express = require ("express")
const path = require("path")
const {default:mongoose} = require ("mongoose")
module.exports = class Application{
    #app = express()
    #PORT
    #DB_URL
    constructor(PORT,DB_URL){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandler()
        
    }
    configApplication(){
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}))
        this.#app.use(express.static(path.join(__dirname,"..","public")))
    }
    createServer(){
        const http = require("http")
        const server = http.createServer(this.#app)
        server.listen(this.#PORT, ()=>{
            console.log("run > http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDB(){
    /*     mongoose.connect(this.#DB_URL,(error) =>{
            if(!error) return console.log("connected to mongodb");
            return console.log(error.message);
        })
    } */

        mongoose.connect(this.#DB_URL).then( () =>{
             console.log("connected to mongodb");
        })
        mongoose.connection.on("connected", () =>{
            console.log("mongoose connected to DB");
        })
        mongoose.connection.on("disconnected", () =>{
            console.log("mongoose connection is disconnected");
        })
        process.on("SIGINT", async()=>{ //زمانیکه برنامه بسته شود کانکشن رو می بنده نکته امنیتی هست
            await mongoose.connection.close()
            process.exit(0)
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
//تنظیم ارورها بصورت دستی
    /* errorHandler(){
        this.#app.use((req,res,next) =>{
            return res.status(404).json({
                statusCode: 404,
                message: "آدرس موردنظر یافت نشد"
            })
        })
        this.#app.use((error,req,res,next) =>{
            const statusCode = error.status || 500;
            const message = error.message || "internal server error"
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    } */
    
   //تنظیم ارورها به پکیج http-errors
   errorHandler(){
    this.#app.use((req,res,next) =>{
        next(createError.NotFound("آدرس موردنظر یافت نشد"))

    })
    this.#app.use((error,req,res,next) =>{
        const serverError = createError.InternalServerError()
        const statusCode = error.status || serverError.status;
        const message = error.message || serverError.message
        return res.status(statusCode).json({
            statusCode,
            errors:{
                message

            }
        })
    })
}

}