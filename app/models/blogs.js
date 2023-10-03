const {default:mongoose} = require("mongoose")
const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId,ref:"user" ,required:true},
    comments: {type: String, required: true},
    createAt: {type: Date, default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId}
})
const Schema = new mongoose.Schema({
    author: {type: mongoose.Types.ObjectId,ref: "user"},
    title: {type:String, required:true},
    short_text: {type:String, required:true},
    text:  {type:String, required:true},
    image: {type:String},
    tags:  {type: [String], default:[]},
    category: {type: [mongoose.Types.ObjectId], required:true},
    comments : {type: [CommentSchema], default: []},
    likes: {type : [mongoose.Types.ObjectId],ref: "user", default:[]},
    dislikes: {type : [mongoose.Types.ObjectId],ref: "user", default:[]},
    bookmarks: {type : [mongoose.Types.ObjectId],ref: "user", default:[]}

},{
    timestamps:true,
    versionKey: false,
    toJSON : {
        virtuals: true
    }
});
Schema.virtual("user", {
    ref : "user",
    localField : "_id",
    foreignField: "author"
})
Schema.virtual("category_detail", {
    ref : "category",
    localField : "_id",
    foreignField: "category"
})
module.exports = {
    BlogModel : mongoose.model ("blog", Schema)
}