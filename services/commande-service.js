const { dbconnect } = require("../utils");
const { ObjectId } = require('mongodb');

async function creationCommande(params) {
    var db = await dbconnect.getDb();
    var commandeCollection = db.collection("commande");
    await commandeCollection.insertOne({
        dateCommande: new Date(),
        id_client: ObjectId(params.id_client),
        detailCommande:params.detailCommande
    });
}



module.exports = { creationCommande };
