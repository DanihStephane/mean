const {dbconnect} = require('../utils');
const { ObjectId } = require('mongodb');
const { PROFILE_LIVREUR } = require('../utils/constantes');

//recuperation d'un ou plusieurs livraison(s)
async function getLivraison(utilisateur,params){
    if(!utilisateur.id_profile.equals(PROFILE_LIVREUR))
        throw new Error("Pas d'autorisation");

    const db = await dbconnect.getDb();
    const livraisonCollection = db.collection('livraison');
    var commandes = await livraisonCollection
        .find({id_livreur:new ObjectId({...params.crt}.id_livreur)})
        .skip((params.pageNumber - 1) * params.nPerPage)
        .limit(params.nPerPage)
        .toArray();
    return commandes;
}

//valider une commande (ajout data livré)
async function updateCommandeLivraison(utilisateur,params){
    if(!utilisateur.id_profile.equals(PROFILE_LIVREUR))
        throw new Error("Pas d'autorisation");

    const db = await dbconnect.getDb();
    var myquery = {_id:new ObjectId({...params.crt}.id_commande)};
    var newValues = { $set: params.commande };
    const restaurantCollection = db.collection('commande');
    var etat = await restaurantCollection.
        updateOne(myquery, newValues);
    return etat;
}

module.exports = {getLivraison,updateCommandeLivraison}