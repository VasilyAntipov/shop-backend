const { Product, ProductInfo, Brand, Country } = require("../models/models")
const { parseFilters, getOffset } = require("../utils/productsUtils")
const { Op } = require("sequelize");
const FileService = require("./fileService");
const { orderList ,groupList} = require('../constants/index')

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
        let { categoryId, brandId, countryId, limit = 5, page = 1, order, group } = filters
        const offset = getOffset(limit, page)
        const { brandIds, countryIds } = parseFilters(brandId, countryId)

        order = order? [orderList.find(item => item.id === +order).value] : orderList[0].value
        const parameters =
        {
            where: { categoryId },
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
            order,
            limit,
            offset,
        }


        const findedProducts = await Product.findAndCountAll(parameters)

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