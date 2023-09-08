const router = require("express").Router();
const { CustomerMovieController } = require("../controllers/Customer");

router.get("/", CustomerMovieController.fetchMovie);
router.get("/:id", CustomerMovieController.fetchMovieDetail);
router.post('/generateCode', CustomerMovieController.generateCode)

module.exports = router;
