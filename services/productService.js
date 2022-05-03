const { Product, ProductInfo, Brand, Country, Rating } = require("../models/models")
const { parseFilters, getOffset } = require("../utils/productsUtils")
const { Op, Sequelize } = require("sequelize");
const FileService = require("./fileService");
const { getOrder, groupList } = require('../constants/index')

class ProductService {

    async create(product) {
        const { file } = product
        const fileName = FileService.saveFile(file)
        const createdProduct = await Product.create({ ...product, img: fileName })
        return createdProduct
    }

    async update(product) {

        const { id, name, price, categoryId, brandId, countryId, info, file } = product
        const updatedProduct = await Product.findOne({ where: { id } })
        updatedProduct.name = name
        if (file) {
            const fileName = FileService.saveFile(file)
            updatedProduct.img = fileName
        }
        updatedProduct.categoryId = Number(categoryId)
        updatedProduct.brandId = Number(brandId)
        updatedProduct.countryId = Number(countryId)
        updatedProduct.price = Number(price)

        updatedProduct.save()
        return updatedProduct

    }


    async addRating(product) {
        const { id, rate } = product
        await Rating.create({ productId: id, rate })
        const findedProduct = await Product.findOne(
            {
                attributes: [
                    'product.*',
                    [Sequelize.fn('avg', Sequelize.col('ratings.rate')), 'avgRating'],
                    [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'countRating'],
                ],
                where: { id },
                include:
                    [
                        {
                            model: Rating,
                            duplicating: false,
                            attributes: [],
                        },
                    ],
                group: ['product.id'],
                raw: true,
            })
        return findedProduct
    }


    async deleteById(id) {
        const deletedProduct = await Product.destroy({ where: { id } })
        console.log(deletedProduct)
        return deletedProduct
    }

    async getAll(filters) {
        let { brandId, countryId, limit = 5, page = 1, orderIndex = 0, categoryId } = filters
        const offset = getOffset(limit, page)
        const { brandIds, countryIds } = parseFilters(brandId, countryId)
        const order = getOrder(orderIndex)
        const parameters =
        {
            attributes: [
                'product.*',
                [Sequelize.fn('avg', Sequelize.col('ratings.rate')), 'avgRating'],
                [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'countRating'],
                [Sequelize.col('brand.name'), 'brandName'],
                [Sequelize.col('country.name'), 'countryName'],
            ],
            include: [
                {
                    model: Brand,
                    where: { id: { [Op.or]: brandIds } },
                    attributes: []
                },
                {
                    model: Country,
                    where: { id: { [Op.or]: countryIds } },
                    attributes: []
                },
                {
                    model: Rating,
                    duplicating: false,
                    attributes: [],
                },
            ],
            where: { categoryId },
            group: ['product.id', 'brand.id', 'country.id'],
            order,
            limit,
            offset,
            raw: true,
        }
        const findedProducts = await Product.findAll(parameters)
        const count = findedProducts.length
        return { count, rows: findedProducts }
    }


    async getTop() {
        const limit = 15 // лимит на показ товаров в слайдере
        const parameters =
        {
            attributes: [
                'product.*',
                [Sequelize.fn('avg', Sequelize.col('ratings.rate')), 'avgRating'],
                [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'countRating'],
            ],
            include: [
                {
                    model: Brand,
                    attributes: ['id', 'name']
                },
                {
                    model: Country,
                    attributes: ['id', 'name']
                },
                {
                    model: Rating,
                    attributes: [],
                    duplicating: false,
                },
            ],
            limit,
            order: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'DESC NULLS LAST'], [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'DESC NULLS LAST']],
            group: ['product.id', 'brand.id', 'country.id'],
            raw: true,
        }
        const findedProducts = await Product.findAll(parameters)
        return findedProducts
    }

    async getOne(id) {

        const parameters =
        {
            attributes: [
                'product.*',
                [Sequelize.fn('avg', Sequelize.col('ratings.rate')), 'avgRating'],
                [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'countRating'],
                [Sequelize.col('brand.name'), 'brandName'],
                [Sequelize.col('country.name'), 'countryName'],
            ],
            include: [
                {
                    model: Brand,
                    attributes: []
                },
                {
                    model: Country,
                    attributes: []
                },
                {
                    model: Rating,
                    duplicating: false,
                    attributes: [],
                },
            ],
            where: { id },
            group: ['product.id', 'brand.id', 'country.id'],
            raw: true,
        }
        const findedProducts = await Product.findAll(parameters)
        const count = findedProducts.length
        return { count, rows: findedProducts }
    }

    async createInfo(productInfo) {
        const createdProductInfo = await ProductInfo.create(productInfo)
        return createdProductInfo
    }
}

module.exports = new ProductService()