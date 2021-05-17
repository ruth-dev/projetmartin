const router = require("express").Router()
const linksController = require("../controllers/links.controller")

router.post("/new", linksController.new)
router.post("/get/:id", linksController.get)
router.post("/up/:id", linksController.up)
router.post("/down/:id", linksController.down)
router.post("/getall", linksController.getAll)
router.post("/delete/:id", linksController.delete)

module.exports = router