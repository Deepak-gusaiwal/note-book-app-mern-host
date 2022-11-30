const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    notes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:"noteSchema",
          require: true,
        },
      ]
})

const userModel = new mongoose.model("user",userSchema);
module.exports = userModel;