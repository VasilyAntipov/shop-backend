const DEFAULT_LIMIT = 1
const DEFAULT_PAGE = 1.
const { Sequelize } = require("sequelize");

const orderList = [
    { id: 1, value: ['price'], title: 'сначала недорогие' },
    { id: 2, value: ['price', 'DESC'], title: 'сначала дорогие' },
    { id: 3, value: ['name'], title: 'по наименованию' },
    {
        id: 4,
        value: [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'DESC NULLS LAST'], [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'DESC NULLS LAST']],
        title: 'по оценке'
    }
]
const groupList = [
    { id: 1, value: '', title: "отсутствует" },
    { id: 2, value: 'brandId', title: 'по производителю' },
    { id: 3, value: 'countryId', title: 'по стране производства' }
]


module.exports = {
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    orderList, groupList
}
