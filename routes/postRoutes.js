const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.readPostAll);
// router.get("/:id", postController.readPostOne);
router.post("/", postController.createPost);
router.put("/:id", postController.modifyPost);
router.delete("/:id", postController.deletePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.modifyComment),
  router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
