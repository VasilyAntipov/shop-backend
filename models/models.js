const sequalize = require('../db')
const Datatypes = require('sequelize')

const User = sequalize.define('user', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: Datatypes.STRING, unique: true },
    password: { type: Datatypes.STRING },
    role: { type: Datatypes.STRING, defaultValue: 'USER' }
})

const Basket = sequalize.define('basket', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketProduct = sequalize.define('basket_product', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Product = sequalize.define('product', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
    price: { type: Datatypes.INTEGER, allowNull: false },
    img: { type: Datatypes.STRING, allowNull: false },
})

const Category = sequalize.define('category', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
    parentId: { type: Datatypes.INTEGER, },
    img: { type: Datatypes.STRING, allowNull: false },
    index: { type: Datatypes.FLOAT, }
})

const Brand = sequalize.define('brand', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
})

const Country = sequalize.define('country', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
})

const Rating = sequalize.define('rating', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: Datatypes.INTEGER, allowNull: false },
})

const ProductInfo = sequalize.define('product_info', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: Datatypes.STRING, allowNull: false },
    description: { type: Datatypes.STRING, allowNull: false },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Product.hasOne(BasketProduct)
BasketProduct.belongsTo(Product)

Category.hasMany(Product, { onDelete: 'NOACTION' })
Product.belongsTo(Category)

Brand.hasMany(Product, { onDelete: 'restrict' })
Product.belongsTo(Brand)

Country.hasMany(Product, { onDelete: 'restrict' })
Product.belongsTo(Country)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Category,
    Brand,
    Country,
    Rating,
    ProductInfo
}