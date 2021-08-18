const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo } = require("../models/models")
const ApiError = require('../error/apiError')
const { Op } = require("sequelize");
const parseFilters = require("../utils/productsUtils")

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, countryId, categoryId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create(
                {
                    name,
                    price,
                    brandId,
                    countryId,
                    categoryId,
                    img: fileName
                })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId
                    })
                });
            }


            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res, next) {
        let { brandId, countryId, limit, page } = req.query;
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit
        const { categoryId } = req.params
        const { brandIds, countryIds } = parseFilters({ brandId, countryId })
        if (!Number.isInteger(parseInt(categoryId))) {
            return next(ApiError.badRequest(
                {
                    message: 'Неверный id каталога'
                }
            ))
        }
        const products = await Product
            .findAndCountAll({
                where: {
                    [Op.and]: [
                        { categoryId },

                        { brandId: { [Op.or]: brandIds } },
                        { countryId: { [Op.or]: countryIds } }
                    ]
                },
                limit,
                offset
            })

        return res.json(products)
    }
    async getOne(req, res) {
        const { id } = req.params
        const product = await Product
            .findOne(
                {
                    where: { id },
                    include: [{ model: ProductInfo, as: 'info' }]
                })
        return res.json(product)
    }
}

module.exports = new ProductController()