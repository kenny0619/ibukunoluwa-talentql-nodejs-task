const router = require("express").Router();

const { protect } = require("../../middlewares/auth.middleware");

const {
  fetchAllPosts,
  fetchPost,
  editPost,
  deletePost,
  createPost,
} = require("../../controllers/post.controller");
router.route("/").get(fetchAllPosts).post(protect, createPost);

router
  .route("/:id")
  .get(fetchPost)
  .patch(protect, editPost)
  .delete(protect, deletePost);

module.exports = router;
