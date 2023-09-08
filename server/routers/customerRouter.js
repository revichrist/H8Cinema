const router = require("express").Router();
const { CustomerController } = require("../controllers/Customer");

router.post('/login', CustomerController.login)
router.post('/register', CustomerController.register)
router.post('/googleLogin', CustomerController.googleLogin)

module.exports = router