const express = require("express")

const router = express.Router()

const streamController = require("../controllers/streamController")

router.get("/status", streamController.getStreamInfo)

module.exports = router