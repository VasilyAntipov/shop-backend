const { Country } = require('../models/models')
const ApiError = require('../error/apiError')

class CountryService {
    async create(name) {
        const createdCountry = await Country.create({name})
        return createdCountry
    }
    async getAll() {
        const countries = await Country.findAll()
        return countries
    }
}

module.exports = new CountryService()