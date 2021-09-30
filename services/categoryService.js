const { Category, Product } = require("../models/models")
const FileService = require("./fileService");
const sequelize = require('sequelize')

class CategoryService {

    async create(category) {

        const { file } = category
        const fileName = FileService.saveFile(file)
        const createdCategory = await Category.create({ ...category, img: fileName })
        return createdCategory
    }

    async update(category) {

        const { id, name, parentId, img, index } = category
        const updatedCategory = await Category.findOne({ where: { id } })
        updatedCategory.name = name
        if (img) {
            const fileName = FileService.saveFile(img)
            updatedCategory.img = fileName
        }
        updatedCategory.parentId = Number(parentId)
        if (index)
            updatedCategory.index = Number(index)
        updatedCategory.save()
        return updatedCategory

    }

    async deleteById(id) {
        const deletedCategory = await Category.destroy({ where: { id } })
        return deletedCategory
    }

    async getAll() {
        const categories = await Category.findAll(
            {
                attributes: {
                    include: [[sequelize.fn('COUNT', sequelize.col('products.id')), "productsCount"]],
                },
                include: [{
                    model: Product,
                    attributes: []
                }],
                group: 'category.id',
            }
        )
        return categories
    }

}

module.exports = new CategoryService()