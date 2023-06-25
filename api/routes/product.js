const express = require('express')
const { productController } = require('../controllers/productController')

const router = express.Router()

// Get all products
router.get('/', productController.getAll)

// Get a single product
router.get('/:id', productController.getById)

// Create a new product
router.post('/', productController.add)

// Update a product
router.put('/:id', productController.edit)

// Delete a product
router.delete('/:id', productController.remove)

module.exports = router
