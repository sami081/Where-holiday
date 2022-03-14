const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require('./config/db');
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const cors = require('cors')
const app = express();
//PERSONNE QUI A LE DROIT DE FAIRE LA REQUETTE AU BACK
const corsOption = {
  origin : process.env.CLIENT_URL,
  Credential : true,
  'allowedHeaders' : ['sessionId', 'Content-Type'],
  'exposedHeaders' : ['sessionId'],
  'methods' : 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'prefLightContinue' : false

}
app.use(cors(corsOption))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


//server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});
