let express = require("express");
let router = express.Router();
const Controller = require("../controller/userControler");
const { body } = require("express-validator");
const FetchUser = require("../middleware/fetchUser")

router.post(
  "/signup",
  [
    body("name", "Name can't be less than 3 charachters")
      .trim()
      .isLength({ min: 3 }),
    body("email", "Please Provide a valid email").trim().isEmail(),
    body("password", "Password length can't be less than 5")
      .trim()
      .isLength({ min: 5 }),
  ],
  Controller.Signup
);
router.post(
  "/login",
  [
    body("email", "Please Provide a valid email").trim().isEmail(),
  ],
  Controller.Login
);

router.get("/",FetchUser,Controller.GetUser)

module.exports = router;
