const express = require('express')
const { subscribeController } = require('../controllers/subscribeController')

const router = express.Router()

// Get all products
router.get('/', subscribeController.getAll)

// Create a new product
router.post('/', subscribeController.add)

module.exports = router
