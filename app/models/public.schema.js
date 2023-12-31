const {default:mongoose} = require("mongoose")

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId,ref:"user" ,required:true},
    comment: {type: String, required: true},
    createAt: {type: Date, default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId, ref: "comment"}
})

module.exports = {
    
    CommentSchema
}