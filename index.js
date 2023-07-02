const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')

const productRouter = require('./api/routes/product')
const postRouter = require('./api/routes/post')
const subscribeRouter = require('./api/routes/subscribe')
const contactRouter = require('./api/routes/contact')

// Load environment variables
dotenv.config()

// Create express app
const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

// Process header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
})

// routes
app.use('/api/products', productRouter)
app.use('/api/posts', postRouter)
app.use('/api/subscribe', subscribeRouter)
app.use('/api/contact', contactRouter)

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
