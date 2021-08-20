const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/apiError')

const ProductService = require('../services/productService')

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, countryId, categoryId, info } = req.body
            const { img } = req.files

            const product = await ProductService.create(
                {
                    name,
                    price,
                    brandId,
                    countryId,
                    categoryId,
                    img
                }
            )
            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ProductService.createInfo({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                });
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            if (!Number.isInteger(parseInt(id))) {
                return next(ApiError.badRequest('Неверный id'))
            }
            const product = await ProductService.deleteById(id)
            return res.json(product)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
    async getAll(req, res, next) {
        try {
            const { brandId, countryId, limit, page } = req.query;
            const { categoryId } = req.params

            if (!Number.isInteger(parseInt(categoryId))) {
                return next(ApiError.badRequest('Неверный id каталога'))
            }


            const products = await ProductService
                .getAll({ brandId, countryId, limit, page, categoryId })

            return res.json(products)
        } catch (e) {
            
            console.log(e)
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            if (!Number.isInteger(parseInt(id))) {
                return next(ApiError.badRequest('Неверный id'))
            }
            const product = await ProductService.getOne(id)
            return res.json(product)
        } catch (e) {
            return next(ApiError.badRequest('Непредвиденная ошибка'))
        }
    }
}

module.exports = new ProductController()