const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), productController.create)
router.get('/all/:categoryId', productController.getAll)
router.get('/one/:id', productController.getOne)
router.get('/top', productController.getTop)
router.delete('/:id', productController.deleteById)
router.put('/', productController.update)
router.post('/rate', productController.addRating)

module.exports = router