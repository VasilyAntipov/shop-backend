const parseFilters = (filters) => {
    let brandIds = [];
    let countryIds = [];

    if (filters.brandId) {
        brandIds = filters.brandId.split(',');
    }
    if (filters.countryId) {
        countryIds = filters.countryId.split(',')
    }
    return { brandIds, countryIds }
}

module.exports = parseFilters