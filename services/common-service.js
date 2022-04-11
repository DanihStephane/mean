const {dbconnect} = require('../utils');

async function find(params, collectionName){
    const db = await dbconnect.getDb();
    const dataCollection = db.collection(collectionName);
    const search = !!(params.search) ? params.search: '';
    const datas = await dataCollection
        .find({...params.crt, nom: {$regex: new RegExp(`.*${search}.*`), $options: 'i'}})
        // .sort({nom: 1})
        .skip((params.pageNumber - 1) * params.nPerPage)
        .limit(params.nPerPage)
        .toArray();
    return datas;
}

module.exports = {find};