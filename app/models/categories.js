const {default:mongoose} = require("mongoose")

const Schema = new mongoose.Schema({
    title: {type: String, required:true},
    parent: {type:mongoose.Types.ObjectId, default: undefined}

});
module.exports = {
    categoryModel : mongoose.model ("category", Schema)
}
//web developer
    //frontend:
        //title: frontend
        //parent: web developerId  
    //backend

//Iot              