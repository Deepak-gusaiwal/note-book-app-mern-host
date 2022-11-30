const notesModel = require("../models/notesModel");
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

// ========================================================Function:-1 Adding The NOTE
exports.AddNote = AddNote = async (req, res) => {
  let { title, desc, tag } = req.body;
  let userId = req.payload.userId;
  let success = false;

  //express validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array(), success });
  }
  // using trycatch block
  try {
    //saving the note in the notes Db
    let note = new notesModel({ title, desc, tag, userId });
    note = await note.save();
    //saving the note in the user's DB
    let user = await userModel.findOne({_id:userId})
     user.notes.push(note);
    await user.save();
    //now sending the response with success true
    success = true;
    return res.status(200).json({ msg: "note saved successfully", success });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error on AddNote", success, error });
  }
};


// =============================================================Function:-2 Updating The NOTE
exports.UpdateNote = UpdateNote = async (req, res) => {
    let { title, desc, tag } = req.body;
    let userId = req.payload.userId;
    let noteId = req.params.id;
    let success = false;
  
    //express validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array(), success });
    }
    // using trycatch block
    try {
    //get user note from note id
    let note = await notesModel.findOne({_id:noteId});
      if(!note){
        return res
        .status(500)
        .json({ msg: "No such note found on UpdateNote", success });
      }
      // verify the user
      if(userId !== note.userId.toString()){
        return res.status(400).json({msg:"Unauthorised Call on Update Note",success})
      }
     
      //now updating the note
      let acknowledge = await notesModel.findByIdAndUpdate(noteId,{
        $set:{title,desc,tag}
      })
      success = true;
      return res.status(200).json({ acknowledge, msg: "note updated successfully", success });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "internal server error on UpdateNote", success, error });
    }
  };

  // =============================================================Function:-3 Deleting The NOTE
exports.DeleteNote = DeleteNote = async (req, res) => {
  let userId = req.payload.userId;
  let noteId = req.params.id;
  let success = false;

 
  // using trycatch block
  try {
  //get user note from note id
  let note = await notesModel.findOne({_id:noteId});
    if(!note){
      return res
      .status(500)
      .json({ msg: "No such note found on DeleteNote", success });
    }
    // verify the user
    if(userId !== note.userId.toString()){
      return res.status(400).json({msg:"Unauthorised Call on DeleteNote",success})
    }
   
    //now Deleting the note
    let acknowledge = await notesModel.findByIdAndDelete(noteId);
    //now Deleting the note from userDB
    let user = await userModel.findById(userId);
    user.notes.pull(note)
    await user.save()
    //sending the response
    success = true;
    return res.status(200).json({ acknowledge, msg: "note Deleted successfully", success });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error on UpdateNote", success, error });
  }
};

// =================================Function 4 Get Notes==============================================
exports.GetNotes = GetNotes = async(req,res)=>{
  let success = false;
  let userId = req.payload.userId;
  try {
    let notes = await notesModel.find({userId});
    if(!notes){
      return res
      .status(200)
      .json({ msg: "Please add some notes to show", success });
    }
    success = true;
    return res.status(200).json({notes,msg:"all notes fetched successfully",success})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "internal server error on GetNotes", success, error });
  }

}
// =================================Function 4 Get Single Note==============================================
exports.GetSingleNote = GetSingleNote = async(req,res)=>{
  let success = false;
  let userId = req.payload.userId;
  let noteId = req.params.id;
  try {
    //fetching the note
    let note = await notesModel.findOne({_id:noteId});
    if(!note){
      return res
      .status(200)
      .json({ msg: "NO Such Note Found", success });
    }
    // verify the user
    if(userId !== note.userId.toString()){
      return res.status(400).json({msg:"Unauthorised Call on GetSingleNote",success})
    }
    //sending response
    success = true;
    return res.status(200).json({note,msg:"note has fetched successfully",success})
  } catch (error) {
    return res
    .status(500)
    .json({ msg: "internal server error on GetNotes", success, error });
  }

}

  