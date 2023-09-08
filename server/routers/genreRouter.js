const router = require("express").Router();
const { GenreController } = require("../controllers");

router.get("/", GenreController.readGenre);

module.exports = router;