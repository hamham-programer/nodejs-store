const { mongoose } = require("mongoose");

const { CommentSchema } = require ("./public.schema")
const BlogSchema = new mongoose.Schema({
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
BlogSchema.virtual("user", {
    ref : "user",
    localField : "_id",
    foreignField: "author"
})
BlogSchema.virtual("category_detail", {
    ref : "category",
    localField : "_id",
    foreignField: "category"
})
BlogSchema.virtual("imageURL").get(function(){   //یک فیلد جدید ایجاد و مقدار جدید توش میریزیم.تبدیل آدرس به url
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports = {
    BlogModel : mongoose.model ("blog", BlogSchema)
}