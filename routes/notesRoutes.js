let express = require("express");
let router = express.Router();
const Controller = require("../controller/notesContoller.js");
const FetchUser = require("../middleware/fetchUser");
const { body } = require("express-validator");

// Route:-1 Add a Note
router.post(
  "/",
  [
    body("title", "title can't be less than 3 charachters")
      .trim()
      .isLength({ min: 3 }),
    body("desc", "Desciption length can't be less than 5")
      .trim()
      .isLength({ min: 5 }),
  ],
  FetchUser,
  Controller.AddNote
);
// Route:-2 Update a Note
router.put(
  "/:id",
  [
    body("title", "title can't be less than 3 charachters")
      .trim()
      .isLength({ min: 3 }),
    body("desc", "Desciption length can't be less than 5")
      .trim()
      .isLength({ min: 5 }),
  ],
  FetchUser,
  Controller.UpdateNote
);
// Route:-3 Delete a Note
router.delete(
  "/:id", FetchUser,Controller.DeleteNote
);

// Route:-4 Get Notes
router.get("/",FetchUser,Controller.GetNotes);

// Route:-5 Get Single Note
router.get("/single/:id",FetchUser,Controller.GetSingleNote);


module.exports = router;
