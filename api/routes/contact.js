const express = require('express')
const { contactController } = require('../controllers/contactController')

const router = express.Router()

// Get all
router.get('/', contactController.getAll)

// Get by id
router.get('/:id', contactController.getById)

// Create
router.post('/', contactController.add)

// Update
router.put('/:id', contactController.edit)

// Delete
router.delete('/:id', contactController.remove)

module.exports = router
