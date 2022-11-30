let express = require("express");
let app = express();
let cors = require("cors");
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: ".env" });
require("./Db/config");

// Routes
app.use("/user", require("./routes/userRotes"));
app.use("/note", require("./routes/notesRoutes.js"));

// for the deployment
// if ((process.env.NODE_ENV = "production")) {
//   const path = require("path");
//   app.use(express.static(path.join(__dirname, "./frontend/build")));
//   app.get("*", function (_, res) {
//     res.sendFile(
//       path.join(__dirname, "./frontend/build/index.html"),
//       function (err) {
//         res.status(500).send(err);
//       }
//     );
//   });
// }


if(process.env.NODE_ENV=='production'){
  const path = require('path')

  app.get('/',(req,res)=>{
      app.use(express.static(path.resolve(__dirname,'frontend','build')))
      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
