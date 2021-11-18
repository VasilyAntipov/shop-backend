const { Brand } = require('../models/models')
const ApiError = require('../error/apiError')

class BrandService {
    async create(name) {
        const createdBrand = await Brand.create({name})
        return createdBrand
    }
    async getAll() {
        const brands = await Brand.findAll({order: ['id']})
        return brands
    }

    async update(brand) {
        const { id, name} = brand
        const updatedBrand= await Brand.findOne({ where: { id } })
        updatedBrand.name = name
        updatedBrand.save()
        return updatedBrand
    }
    async delete(id) {
        const deletedBrand = await Brand.destroy({ where: { id } })
        return id
    }
}

module.exports = new BrandService()