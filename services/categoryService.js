const { Category } = require("../models/models")
const FileService = require("./fileService");


class CategoryService {

    async create(category) {

        const { img } = category
        const fileName = FileService.saveFile(img)
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
        if (parentId)
            updatedCategory.parentId = parentId
        if (index)
            updatedCategory.index = index
        updatedCategory.save()
        return updatedCategory

    }

    async deleteById(id) {
        const deletedCategory = await Category.destroy({ where: { id } })
        return deletedCategory
    }

    async getAll() {
        const categories = await Category.findAll()
        return categories
    }
}

module.exports = new CategoryService()