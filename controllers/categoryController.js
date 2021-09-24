const { Category } = require('../models/models')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')
const CategoryService = require('../services/categoryService')


class CategoryController {
    async create(req, res, next) {
        try {
            let { name, parentId, index } = req.body
            if (!Number.isInteger(parseInt(index))) {
                index = 0
            }
            if (!Number.isInteger(parseInt(parentId))) {
                parentId = 0
            }
            const { file } = req.files
            const category = await CategoryService.create(
                { name, parentId, file, index }
            )
            return res.json(category)
        } catch (e) {
            console.log(e)
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
            if (!Number.isInteger(parseInt(index))) {
                index = 0
            }
            if (!Number.isInteger(parseInt(parentId))) {
                parentId = 0
            }
            const category = await CategoryService.update(
                { name, parentId, id, img, index }
            )
            return res.json(category)
        } catch (e) {
            // console.log(e)
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
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