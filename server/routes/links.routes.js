const router = require("express").Router()
const linksController = require("../controllers/links.controller")
const verifyToken = require("../middlewares/verifyToken")

router.post("/new", linksController.new)
router.post("/get/:id", linksController.get)
router.post("/up/:id", linksController.up)
router.post("/down/:id", linksController.down)

module.exports = router