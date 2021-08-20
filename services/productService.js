const { Product, ProductInfo, Brand, Country } = require("../models/models")
const { parseFilters, getOffset } = require("../utils/productsUtils")
const { Op } = require("sequelize");
const FileService = require("./fileService");

class ProductService {

    async create(product) {
        const { img } = product
        const fileName = FileService.saveFile(img)
        const createdProduct = await Product.create({ ...product, img: fileName })
        return createdProduct
    }

    async deleteById(id) {
        const deletedProduct = await Product.destroy({ where: { id } })
        return deletedProduct
    }

    async getAll(filters) {
        const { categoryId, brandId, countryId, limit, page } = filters
        const offset = getOffset(limit, page)
        const { brandIds, countryIds } = parseFilters(brandId, countryId)

        const findedProducts = await Product.findAndCountAll({
            where: {
                [Op.and]: [
                    { categoryId },
                    // { brandId: { [Op.or]: brandIds } },
                    { countryId: { [Op.or]: countryIds } }
                ]
            },
            include: [
                {
                    model: Brand,
                    where: { id: { [Op.or]: brandIds } },
                    attributes: ['name']
                },
                {
                    model: Country,
                    where: { id: { [Op.or]: countryIds } },
                    attributes: ['name']
                },
            ],
            limit,
            offset
        })

        // const findedBrands = await Brand.findAll({
        //     attributes: ['name', [fn('COUNT', col('products.id')), 'count']],
        //     include: [{ model: Product, where: { categoryId }, attributes: [] }],
        //     group: ['brand.id']
        // })

        return findedProducts
    }
    async getOne(id) {
        const findedProduct = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            })
        return findedProduct
    }
    async createInfo(productInfo) {
        const createdProductInfo = await ProductInfo.create(productInfo)
        return createdProductInfo
    }
}

module.exports = new ProductService()