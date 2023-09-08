const router = require("express").Router();
const { CustomerBookmarkController } = require("../controllers/Customer");

// completed
router.post('/:id', CustomerBookmarkController.postBookmark)

// ongoing
router.get('/', CustomerBookmarkController.fetchBookmark)

// unimplemented
router.delete('/:id', CustomerBookmarkController.deleteBookmark)

module.exports = router;
