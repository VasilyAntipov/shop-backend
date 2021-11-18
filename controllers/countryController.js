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
    async update(req, res, next) {
        try {
            let { name, id } = req.body
            const country = await CountryService.update(
                { name, id }
            )
            return res.json(country)
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
            const country = await CountryService.delete(id)
            return res.json(country)
        } catch (e) {
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
}

module.exports = new CountryController()