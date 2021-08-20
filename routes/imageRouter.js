const Router = require('express')
const router = new Router()
const path = require('path')

router.get('/:image', (req, res) => {
    try {
        res.sendFile(path.resolve(__dirname, '..', 'static', req.params.image) )
        console.log(__dirname + '..' + 'static' + req.params.image)
    } catch (e) {
        console.log(e)
    }   

})

module.exports = router