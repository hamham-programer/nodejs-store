const {AllRoutes} = require("./router/router")

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
            return console.log("faild to connect to mongodb");
        })
    } */

        mongoose.connect(this.#DB_URL).then( () =>{
             console.log("connected to mongodb");
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }

    errorHandler(){
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
    }
   
}