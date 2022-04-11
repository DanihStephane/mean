const { ObjectId } = require('mongodb');
async function clientProfile (db, codeProfile) {
    const uCollection = db.collection("profile");
    const profil = await uCollection.findOne({
        _id: new ObjectId(codeProfile),
    });
    if (!profil) {
        throw new Error(`Le code profile ${codeProfile} est introuvable`);
    }
    return profil;
}

module.exports = { clientProfile};
