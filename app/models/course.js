const {default:mongoose} = require("mongoose")
const { CommentSchema } = require ("./public.schema")
const Episodes = new mongoose.Schema({
    title : {type: String, required: true},
    text : {type: String, default: ""},
    type : {type: String, default: "unlock"},//قفل یا باز
    time : {type: String, required: true},  //با تایم اصلی جمع میشود
    videoAddress: {type: String, required:true}

},{toJSON: {virtuals: true}}) //هرجایی بخواهیم عملیات ویرچوال رو اعمال کنیم این خط باید اضافه شود
Episodes.virtual("videoURL").get(function(){   //یک فیلد جدید ایجاد و مقدار جدید توش میریزیم
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})
const Chapter =new mongoose.Schema({
    title : {type: String, required: true},
    text : {type: String, default: ""},
    episodes: {type: [Episodes], default: []}
})
const CourseSchema = new mongoose.Schema({
    title: {type: String, required:true},
    short_text: {type: String, required:true},
    text: {type: String, required:true},
    image: {type: String, required:true},
    tags: {type: [String], default:[]},
    category: {type: mongoose.Types.ObjectId,ref:"category", required:true},
    comments: {type: [CommentSchema], default:[]},
    likes: {type: [mongoose.Types.ObjectId], default:[]},
    deslikes: {type: [mongoose.Types.ObjectId], default:[]},
    bookmarks: {type: [mongoose.Types.ObjectId], default:[]},
    price: {type: Number,required:true},
    discount: {type: Number, default:0},
    type : {type: String, default: "free"/*free, cash, special */, required : true},
    status: {type: String, default: "notStarted"}, //finish-notstarted-started
    time: {type: String, default: "00,00:00"},
    teacher: {type: mongoose.Types.ObjectId,ref: "user" ,required:true},
    chapters: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
    
},{
    toJSON:{
        virtuals: true //برای استفاده از Populate باید این خط اضافه شود
    }
});
CourseSchema.index({title:"", short_text: "", text: ""})
CourseSchema.virtual("imageURL").get(function(){   //یک فیلد جدید ایجاد و مقدار جدید توش میریزیم
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports = {
    CourseModel : mongoose.model ("course", CourseSchema)
}