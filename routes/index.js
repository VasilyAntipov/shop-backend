const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter');
const brandRouter = require('./brandRouter');
const categoryRouter = require('./categoryRouter');
const countryRouter = require('./countryRouter');
const userRouter = require('./userRouter');
const filterRouter = require('./filterRouter');
const imageRouter = require('./imageRouter');

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/country', countryRouter)
router.use('/product', productRouter)
router.use('/filter', filterRouter)
router.use('/image', imageRouter)

module.exports = router