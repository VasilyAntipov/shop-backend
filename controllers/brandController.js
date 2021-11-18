const ApiError = require('../error/apiError')
const BrandService = require('../services/brandService')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await BrandService.create(name)
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await BrandService.getAll()
        return res.json(brands)
    }
    async update(req, res, next) {
        try {
            let { name, id } = req.body
            const brand = await BrandService.update(
                { name, id }
            )
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            if (!Number.isInteger(parseInt(id))) {
                return next(ApiError.badRequest('Неверный id'))
            }
            const brand = await BrandService.delete(id)
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
}

module.exports = new BrandController()