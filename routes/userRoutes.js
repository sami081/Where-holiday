const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require('../controllers/uploadController')
// const multer = require ('multer');
// const User = require('../models/userModel')
// //upload
// const storage = multer.diskStorage({
//   destination : function (req, file, cb){
//     cb(null, "./public/uploads/images");
//   },
//   filename : function (req, file, cb){
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({
//   storage : storage,
//   limits : {
//     fieldSize: 500000
//   }
// })





// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyUser);
router.delete("/:id", userController.deleteUser);






module.exports = router;
