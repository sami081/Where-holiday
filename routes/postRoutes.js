const router = require("express").Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const  path = require("path");
const uuid4 = require("uuid4").v4;
const PostModel = require('../models/postModel')
const mongoose = require('mongoose')
const ObjectID = require("mongoose").Types.ObjectId;


//storage
const Storage = multer.diskStorage({
  destination : 'uploads',
  filename:(req, file, cb) => {
    cb(null, file.originalname)
  },
});
const upload = multer({
  storage :Storage
}).single("testImage")

router.get("/", postController.readPostAll);
router.get("/:id", postController.readPostOne);
router.post("/", postController.createPost);
router.put("/:id", postController.modifyPost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost),
  router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

//storage


 



module.exports = router;
