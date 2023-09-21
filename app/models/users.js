const {default:mongoose} : require("mongoose")

const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, lowercase:true},
    phone: {type: String},
    email: {type: String, lowercase:true},
    password: {type: String},
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