const express = require('express')
const { subscribeController } = require('../controllers/subscribeController')

const router = express.Router()

// Get all
router.get('/', subscribeController.getAll)

// Create
router.post('/', subscribeController.add)

module.exports = router
