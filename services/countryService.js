const { Country } = require('../models/models')
const ApiError = require('../error/apiError')

class CountryService {
    async create(name) {
        const createdCountry = await Country.create({name})
        return createdCountry
    }
    async getAll() {
        const countries = await Country.findAll({order: ['id']})
        return countries
    }
    async update(country) {
        const { id, name} = country
        const updatedCountry= await Country.findOne({ where: { id } })
        updatedCountry.name = name
        updatedCountry.save()
        return updatedCountry
    }
    async delete(id) {
        const deletedCountry = await Country.destroy({ where: { id } })
        return id
    }
}

module.exports = new CountryService()