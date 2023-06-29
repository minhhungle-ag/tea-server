const express = require('express')
const { postController } = require('../controllers/postController')

const router = express.Router()

// Get all products
router.get('/', postController.getAll)

// Get a single product
router.get('/:id', postController.getById)

// Create a new product
router.post('/', postController.add)

// Update a product
router.put('/:id', postController.edit)

// Delete a product
router.delete('/:id', postController.remove)

module.exports = router
