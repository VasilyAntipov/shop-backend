const ApiError = require('../error/apiError')
class UserController {
    async registration(req, res) {

    }
    async login(req, res) {

    }
    async auth(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest({ message: 'Не задан ID' }))
        }
        res.json(id)
    }
}

module.exports = new UserController()