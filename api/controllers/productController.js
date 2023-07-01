const Product = require('../models/product')

const productController = {
  // get all products
  async getAll(req, res) {
    const { page, limit, searchKey, type, priceFrom, priceTo } = req.query

    const filters = {}
    if (searchKey) filters.title = { $regex: searchKey, $options: 'i' }
    if (type) filters.type = type
    if (priceFrom && priceTo) filters.price = { $gte: priceFrom, $lte: priceTo }

    const currentPage = parseInt(page) || 1
    const currentLimit = parseInt(limit) || 10
    const skip = (currentPage - 1) * currentLimit

    try {
      const productList = await Product.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(currentLimit)

      const total = await Product.countDocuments(filters)
      const totalPages = Math.ceil(total / currentLimit)

      res.status(200).json({
        data: {
          data: productList,
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

  // get product details
  async getById(req, res) {
    const _id = req.params.id

    try {
      const product = await Product.findById(_id)

      if (!product) {
        return res.status(404).json({
          message: 'not found',
          error: 1,
          data: null,
        })
      }

      res.status(200).json({
        message: 'Successfully',
        error: 0,
        data: product,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },

  // add a new product
  async add(req, res) {
    try {
      const product = new Product({
        ...req.body,
        createdAt: new Date(),
      })

      await product.save()

      res.status(201).json({
        message: 'Add product successfully!',
        error: 0,
        data: product,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  // edit product
  async edit(req, res) {
    const _id = req.params.id

    try {
      const product = await Product.updateOne(
        { _id },
        {
          $set: {
            ...req.body,
            updatedAt: new Date(),
          },
        }
      )

      if (!product) {
        return res.status(404).json({
          message: 'Product not found',
          error: 1,
          data: null,
        })
      }

      res.status(201).json({
        message: 'Edit product successfully!',
        error: 0,
        data: product,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  async remove(req, res) {
    const id = req.params.id

    try {
      const product = await Product.findByIdAndDelete(id)

      if (!product) {
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
module.exports = { productController }
