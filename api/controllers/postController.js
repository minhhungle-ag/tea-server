const Post = require('../models/post')

const postController = {
  // get all posts
  async getAll(req, res) {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    try {
      const postList = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Post.countDocuments()
      const totalPages = Math.ceil(total / limit)

      res.status(200).json({
        data: {
          data: postList,
          pagination: {
            page,
            limit,
            totalPages,
            total,
          },
        },
        message: 'Get all Post list successfully!',
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

  // get post details
  async getById(req, res) {
    const _id = req.params.id

    try {
      const post = await Post.findById(_id)

      if (!post) {
        return res.status(404).json({
          message: 'not found',
          error: 1,
          data: null,
        })
      }

      res.status(200).json({
        message: 'Get post detail successfully',
        error: 0,
        data: post,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },

  // add a new post
  async add(req, res) {
    try {
      const post = new Post({
        ...req.body,
        createdAt: new Date(),
      })

      await post.save()

      res.status(201).json({
        message: 'Add post successfully!',
        error: 0,
        data: post,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  // edit post
  async edit(req, res) {
    const _id = req.params.id

    try {
      const post = await Post.updateOne(
        { _id },
        {
          $set: {
            ...req.body,
            updatedAt: new Date(),
          },
        }
      )

      if (!post) {
        return res.status(404).json({
          message: 'Post not found',
          error: 1,
          data: null,
        })
      }

      res.status(201).json({
        message: 'Edit post successfully!',
        error: 0,
        data: post,
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
      const post = await Post.findByIdAndDelete(id)

      if (!post) {
        return res.status(404).json({
          message: 'post not found!',
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
module.exports = { postController }
