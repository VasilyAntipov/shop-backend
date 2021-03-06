const { Product, Brand, Country } = require("../models/models")
const { Op, fn, col } = require("sequelize");
const { groupList } = require('../constants/index')
const {orderList} = require('../constants/index')

class FilterService {

    async getByCategoryId(categoryId) {

        const findedCountries = await Country.findAll({
            attributes: ['id', 'name', [fn('COUNT', col('products.id')), 'count']],
            include: [{ model: Product, where: { categoryId }, attributes: [] }],
            group: ['country.id']
        })

        const findedBrands = await Brand.findAll({
            attributes: ['id', 'name', [fn('COUNT', col('products.id')), 'count']],
            include: [{ model: Product, where: { categoryId }, attributes: [] }],
            group: ['brand.id']
        })

        const findedFilters = {
            filters: [
                {
                    type: 'brandId',
                    name: 'Производитель',
                    data: findedBrands
                },
                {
                    type: 'countryId',
                    name: 'Страна производства',
                    data: findedCountries
                },
            ],
            orderList,
            groupList

        }
        return findedFilters
    }

}

module.exports = new FilterService()