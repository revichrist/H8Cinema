const router = require("express").Router();
const { MovieController } = require("../controllers");
const { deleteAuthorization, statusAuthorization } = require("../middlewares");

router.post("/", MovieController.postMovie);
router.get("/", MovieController.readMovie);
router.get("/:id", MovieController.detailMovie);
router.delete("/:id", deleteAuthorization, MovieController.deleteMovie);
router.put("/:id", MovieController.editMovieData);
router.patch("/:id", statusAuthorization, MovieController.editStatus)

module.exports = router;