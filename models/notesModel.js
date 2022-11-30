const mongoose = require("mongoose");
let noteSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema"
    },
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
});

let noteModel = new mongoose.model('notes',noteSchema);
module.exports=noteModel;
