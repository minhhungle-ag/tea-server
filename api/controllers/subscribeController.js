const Subscribe = require('../models/subscribe')

const subscribeController = {
  // get all Subscribes
  async getAll(req, res) {
    const { page, limit } = req.query

    const currentPage = parseInt(page) || 1
    const currentLimit = parseInt(limit) || 10
    const skip = (currentPage - 1) * currentLimit

    try {
      const subscribeList = await Subscribe.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Subscribe.countDocuments(filters)
      const totalPages = Math.ceil(total / currentLimit)

      res.status(200).json({
        data: {
          data: subscribeList,
          pagination: {
            page: currentPage,
            limit: currentLimit,
            totalPages,
            total,
          },
        },
        message: 'Successfully',
        error: 0,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  // add a new Subscribe
  async add(req, res) {
    try {
      const subscribe = new Subscribe({
        ...req.body,
        createdAt: new Date(),
      })

      await subscribe.save()

      res.status(201).json({
        message: 'Successfully!',
        error: 0,
        data: subscribe,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  // remove subscribe
  async remove(req, res) {
    const id = req.params.id

    try {
      const subscribe = await Subscribe.findByIdAndDelete(id)

      if (!subscribe) {
        return res.status(404).json({
          message: 'Product not found!',
          error: 1,
        })
      }

      res.status(200).json({
        message: `Remove ${id} successfully!`,
        error: 0,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },
}
module.exports = { subscribeController }
