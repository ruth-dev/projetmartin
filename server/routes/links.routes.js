const router = require("express").Router()
const linksController = require("../controllers/links.controller")
const verifyToken = require("../middlewares/verifyToken")

router.post("/new", verifyToken, linksController.new)
router.post("/get/:id", verifyToken, linksController.get)
router.post("/up/:id", verifyToken, linksController.up)
router.post("/down/:id", verifyToken, linksController.down)
router.post("/getall", verifyToken, linksController.getAll)
router.post("/delete/:id", verifyToken, linksController.delete)

module.exports = router