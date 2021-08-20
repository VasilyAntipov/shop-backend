const { DEFAULT_LIMIT, DEFAULT_PAGE } = require("../constants");

const parseFilters = (brandId, countryId) => {

    let brandIds = [];
    let countryIds = [];

    if (brandId) {
        brandIds = brandId.split(',');
    }
    if (countryId) {
        countryIds = countryId.split(',')
    }
    return { brandIds, countryIds }
}

const getOffset = (limit, page) => {
    limit = limit || DEFAULT_LIMIT
    page = page || DEFAULT_PAGE
    return page * limit - limit
}

module.exports = { parseFilters, getOffset }