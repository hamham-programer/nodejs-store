const {default:mongoose} : require("mongoose")

const Schema = new mongoose.Schema({
    first_name: {type: String, required:true},
    last_name: {type: String, required:true},
    username: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    otp: {type: Object, default:{
        code: "",
        expires :0     // or  new Date().getDate() +120
    }},
    bils: {type:[], default:[]},
    discount: {type:Number, default:0},
    birthday: {type:String},
    Roles: {type:[String], default:["USER"]}



});
module.exports = {
    UserModel = mongoose.model ("user", Schema)
}