const Product = sequalize.define('product', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
    price: { type: Datatypes.INTEGER, allowNull: false },
    rating: { type: Datatypes.INTEGER, defaultValue: 0 },
    img: { type: Datatypes.STRING, allowNull: false },
})
const Brand = sequalize.define('brand', {
    id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Datatypes.STRING, unique: true, allowNull: false },
})

Brand.hasMany(Product)
Product.belongsTo(Brand)