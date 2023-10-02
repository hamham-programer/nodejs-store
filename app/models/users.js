const { default: mongoose } = require("mongoose");


const Schema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String, lowercase:true},
    mobile : {type : String, required : true, unique: true},
    email: {type: String, lowercase:true},
    password: {type: String},
    otp: {type: Object, default:{
        code: "",
        expiresIn :0     // or  new Date().getDate() +120
    }},
    bils: {type:[], default:[]},
    discount: {type:Number, default:0},
    birthday: {type:String},
    Roles: {type:[String], default:["USER"]}



},{
    timestamps: true,
    toJSON:{
        virtual: true
    }
});
module.exports = {
    UserModel : mongoose.model ("user", Schema)
}