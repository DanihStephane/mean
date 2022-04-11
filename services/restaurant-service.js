const commonService = require('./common-service');

async function findRestaurants(params){
    return commonService.find(params, 'restaurant');
}

module.exports = {findRestaurants};