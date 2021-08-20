const { Brand } = require('../models/models')
const ApiError = require('../error/apiError')

class BrandService {
    async create(name) {
        const createdBrand = await Brand.create({name})
        return createdBrand
    }
    async getAll() {
        const brands = await Brand.findAll()
        return brands
    }
}

module.exports = new BrandService()