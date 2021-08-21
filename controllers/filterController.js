const { Product, Country, Brand, Category } = require('../models/models')
const ApiError = require('../error/apiError')
const FilterService = require('../services/filterService')

class FilterController {

    async getByCategoryId(req, res, next) {
        try {
            const {categoryId} = req.params
            const product = await FilterService.getByCategoryId(categoryId)
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new FilterController()