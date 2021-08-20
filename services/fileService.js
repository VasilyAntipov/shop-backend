const uuid = require('uuid')
const path = require('path')

class FileService {
    saveFile(img) {
        try {
            const fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            return fileName
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new FileService()