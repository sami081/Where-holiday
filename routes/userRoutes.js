const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const upload = multer();
// auth
router.post("/register", multer, authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyUser);
router.delete("/:id", userController.deleteUser);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);
module.exports = router;
