const router = require("express").Router();
const { HistoryController } = require("../controllers");

router.get("/", HistoryController.showHistory);

module.exports = router;
