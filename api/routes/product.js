const express = require('express')
const { productController } = require('../controllers/productController')

const router = express.Router()

// Get all
router.get('/', productController.getAll)

// Get by id
router.get('/:id', productController.getById)

// Create
router.post('/', productController.add)

// Update
router.put('/:id', productController.edit)

// Delete
router.delete('/:id', productController.remove)

module.exports = router
