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
}

module.exports = new BrandController()