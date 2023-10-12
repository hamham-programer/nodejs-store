const {default:mongoose} = require("mongoose")
const { CommentSchema } = require ("./public.schema")
const Episodes =  mongoose.Schema({
    title : {type: String, required: true},
    text : {type: String, default: ""},
    type : {type: String, default: "free"},
    time : {type: String, required: true},  //با تایم اصلی جمع میشود

})
const Chapter = mongoose.Schema({
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
    
});
CourseSchema.index({title:"", short_text: "", text: ""})
module.exports = {
    CourseModel : mongoose.model ("course", CourseSchema)
}