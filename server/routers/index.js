const router = require("express").Router();
const staffLogin = require("./userRouter");
const movieRouter = require("./movieRouter");
const genreRouter = require("./genreRouter");
const historyRouter = require("./historyRouter");

// Users
const customerLogin = require("./customerRouter");
const customerMovieRouter = require("./customerMovieRouter");
const customerBookmarkRouter = require("./customerBookmarkRouter");
const { authentication } = require("../middlewares");

router.get("/", async (request, response, next) => {
  try {
    response.status(200).json({
      statusCode: 200,
      message: "Hello World!",
    });
  } catch (error) {
    next(error);
  }
});

router.use("/", staffLogin);
router.use("/cust", customerLogin);
router.use("/cust/movies", customerMovieRouter);

router.use(authentication);

// Staff
router.use("/movies", movieRouter);
router.use("/genres", genreRouter);
router.use("/histories", historyRouter);

// Customers
router.use("/cust/bookmark", customerBookmarkRouter);

module.exports = router;
