const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

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
