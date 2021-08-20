const { Country } = require('../models/models')
const ApiError = require('../error/apiError')
const CountryService = require('../services/countryService')

class CountryController {
    async create(req, res) {
        const { name } = req.body
        const country = await CountryService.create(name)
        return res.json(country)
    }
    async getAll(req, res) {
        const countries = await CountryService.getAll()
        return res.json(countries)
    }
}

module.exports = new CountryController()