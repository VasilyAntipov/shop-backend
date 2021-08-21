const Router = require('express')
const router = new Router()
const filterController = require('../controllers/filterController')

router.get('/:categoryId', filterController.getByCategoryId)
module.exports = router