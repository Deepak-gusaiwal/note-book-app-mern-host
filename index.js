const path = require('path');
let express = require('express');
let app = express();
let cors = require('cors')
app.use(express.json())
app.use(cors());
require('dotenv').config({path:".env"});
require("./Db/config");

// Routes
app.use('/user',require('./routes/userRotes'));
app.use('/note',require('./routes/notesRoutes.js'));

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


// ======> just to understand how to .toSting() works (which we using in Upadte Note Function at userController)
// const obj = new Object ("Deep")
// console.log(obj.toString(),obj)
const PORT = process.env.port || 5000
app.listen(PORT)