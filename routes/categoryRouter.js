const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), categoryController.create)
router.put('/', checkRole('ADMIN'), categoryController.update)
router.delete('/:id', checkRole('ADMIN'), categoryController.deleteById)
router.get('/', categoryController.getAll)
module.exports = router