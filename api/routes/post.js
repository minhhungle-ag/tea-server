const express = require('express')
const { postController } = require('../controllers/postController')

const router = express.Router()

// Get all
router.get('/', postController.getAll)

// Get by id
router.get('/:id', postController.getById)

// Create
router.post('/', postController.add)

// Update
router.put('/:id', postController.edit)

// Delete
router.delete('/:id', postController.remove)

module.exports = router
