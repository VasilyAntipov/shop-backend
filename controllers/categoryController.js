const { Category } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const CategoryService = require('../services/categoryService')


class CategoryController {
    // async create(req, res) {
    //     const { name, parentId } = req.body
    //     const img = req.files
    //     console.log(img)
    //     let fileName = uuid.v4() + '.jpg'
    //     img.mv(path.resolve(__dirname, '..', 'static', fileName))

    //     const category = await Category.create({ name, parentId, img: fileName })
    //     return res.json(category)
    // }

    async create(req, res, next) {
        try {
            let { name, parentId, index } = req.body
            const {img} = req.files
            const category = await CategoryService.create(
                { name, parentId, img, index }
            )
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async update(req, res, next) {
        try {
            let img = null;
            let { name, parentId, id, index } = req.body
            if (req.files) {
                img = req.files.img
            }
            const category = await CategoryService.update(
                { name, parentId, id, img, index }
            )
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req,res) {
        const categories = await CategoryService.getAll()
        return res.json(categories)
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            if (!Number.isInteger(parseInt(id))) {
                return next(ApiError.badRequest('Неверный id'))
            }
            const category = await CategoryService.deleteById(id)
            return res.json(category)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
}

module.exports = new CategoryController()