const Contact = require('../models/contact')

const contactController = {
  // get all contact
  async getAll(req, res) {
    const { page, limit } = req.query

    const currentPage = parseInt(page) || 1
    const currentLimit = parseInt(limit) || 10
    const skip = (currentPage - 1) * currentLimit

    try {
      const contactList = await Contact.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(currentLimit)

      const total = await Contact.countDocuments()
      const totalPages = Math.ceil(total / currentLimit)

      res.status(200).json({
        data: {
          data: contactList,
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

  // get contact details
  async getById(req, res) {
    const _id = req.params.id

    try {
      const contact = await Contact.findById(_id)

      if (!contact) {
        return res.status(404).json({
          message: 'not found',
          error: 1,
          data: null,
        })
      }

      res.status(200).json({
        message: 'Successfully',
        error: 0,
        data: contact,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },

  // add a new contact
  async add(req, res) {
    try {
      const contact = new Contact({
        ...req.body,
        createdAt: new Date(),
      })

      await contact.save()

      res.status(201).json({
        message: 'Add contact successfully!',
        error: 0,
        data: contact,
      })
    } catch (error) {
      res.status(400).json({
        message: error.message,
        error: 1,
        data: null,
      })
    }
  },

  // edit contact
  async edit(req, res) {
    const _id = req.params.id

    try {
      const contact = await Contact.updateOne(
        { _id },
        {
          $set: {
            ...req.body,
            updatedAt: new Date(),
          },
        }
      )

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
          error: 1,
          data: null,
        })
      }

      res.status(201).json({
        message: 'Edit contact successfully!',
        error: 0,
        data: contact,
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
      const contact = await Contact.findByIdAndDelete(id)

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found!',
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
module.exports = { contactController }
