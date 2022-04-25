const DEFAULT_LIMIT = 1
const DEFAULT_PAGE = 1.
const { Sequelize } = require("sequelize");

const orderList = [
    { id: 0, title: 'сначала недорогие' },
    { id: 1, title: 'сначала дорогие' },
    { id: 2, title: 'по наименованию' },
    { id: 3, title: 'по оценке' }
]

const getOrder = (id) => {
    const orderValues = [
        ['price'],
        [['price', 'DESC']],
        ['name'],
        [[Sequelize.fn('AVG', Sequelize.col('ratings.rate')), 'DESC NULLS LAST'], [Sequelize.fn('COUNT', Sequelize.col('ratings.id')), 'DESC NULLS LAST']]
    ]
    return orderValues[id]
}

const groupList = [
    { id: 0, value: '', title: "отсутствует" },
    { id: 1, value: 'brandId', title: 'по производителю' },
    { id: 2, value: 'countryId', title: 'по стране производства' }
]


module.exports = {
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    getOrder,
    orderList,
    groupList
}
