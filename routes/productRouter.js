const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/', productController.create)
router.get('/all/:categoryId', productController.getAll)
router.get('/one/:id', productController.getOne)
router.delete('/:id', productController.deleteById)

module.exports = router