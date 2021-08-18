const { Category } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')

class CategoryController {
    async create(req, res) {
        const { name, parentId } = req.body
        const { img } = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const category = await Category.create({ name, parentId, img: fileName })
        return res.json(category)
    }
    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoryController()