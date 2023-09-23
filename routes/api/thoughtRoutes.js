const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtControllers");

// /api/thoughts
router
.route("/")
.get(getAllThoughts)
.post(createThought);

// /api/thoughts/:userId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;