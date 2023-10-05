const {default:mongoose} : require("mongoose")
const { CommentSchema } = require ("./public.schema")
const Episodes = mongoose.schema({
    title : {type: String, required: true},
    text : {type: String, default: ""},
    type : {type: String, default: "free"},
    time : {type: String, required: true},  //با تایم اصلی جمع میشود

})
const Chapter = mongoose.schema({
    title : {type: String, required: true},
    text : {type: String, default: ""},
    episodes: {type: [Episodes], default: []}
})
const Schema = new mongoose.Schema({
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
    price: {type: number,required:true},
    discount: {type: number, default:0},
    type: {type: String, required:true, default: "free"}, //cash || free || special
    time: {type: String, default: "00,00:00"},
    teacher: {type: mongoose.Types.ObjectId,ref: "user" required:true},
    chapter: {type: [Chapter], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
    
});
module.exports = {
    CourseModel : mongoose.model ("course", Schema)
}