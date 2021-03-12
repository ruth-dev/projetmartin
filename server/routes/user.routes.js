const router = require("express").Router()
const userController = require("../controllers/user.controller")
const verifyToken = require("../middlewares/verifyToken")

router.post("/signup", userController.signup)
router.post("/signin", userController.signin)
router.post("/checkToken", verifyToken , userController.checkToken)

module.exports = router