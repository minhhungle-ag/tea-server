const { default: mongoose } = require('mongoose')

// Define product schema
const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
})

module.exports = mongoose.model('Subscribe', subscribeSchema)
