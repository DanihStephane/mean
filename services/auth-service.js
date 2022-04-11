const { dbconnect } = require("../utils");
const sha1 = require("sha1");
const moment = require("moment");
const { ObjectId } = require('mongodb');
const profileService = require('./profile-service');
const { tools } = require("../utils");

async function isValidToken(authorization, code){
    const error = new Error(`Vous n'avez pas d'authorisation, code: ${code}`);
    if (!authorization) throw error;
    const db = await dbconnect.getDb();
    const tokenExtract = tools.extractToken(authorization);
    const token = await db.collection("token").findOne({ token: tokenExtract });
    const utilisateur = await db.collection("utilisateur").findOne({ _id: token?.id_utilisateur });
    const profile = await db.collection("profile").findOne({ _id: utilisateur?.id_profile });
    const isValid = (token && utilisateur && profile && profile?.code === code);
    if (!isValid) throw error;
}

async function inscription(utilisateur) {
    var db = await dbconnect.getDb();
    const client = await profileService.clientProfile(db, new ObjectId("625182d0ccd3134b2722da30"));
    var tokenCollection = db.collection("utilisateur");
    console.log(utilisateur);
    await tokenCollection.insertOne({
        nomUtilisateur: utilisateur.nomUtilisateur,
        mdp: sha1(utilisateur.mdp),
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        id_profile: client._id,
    });
    return login(utilisateur.nomUtilisateur, utilisateur.mdp, db);
}

async function saveToken(db, utilisateur) {
    var token = sha1(
        utilisateur._id +
            utilisateur.mdp +
            moment().format("YYYY-MM-DD HH:mm:ss.SSS")
    );
    var tokenCollection = db.collection("token");
    await tokenCollection.insertOne({
        id_utilisateur: utilisateur._id,
        token: token,
        date_expiration: moment().add(1, "h").toDate(),
    });
    return token;
}

async function login(nomUtilisateur, mdp, db) {
    if (db === undefined) db = await dbconnect.getDb();
    var uCollection = db.collection("utilisateur");
    var utilisateur = await uCollection.findOne({
        nomUtilisateur,
        mdp: sha1(mdp),
    });
    if (!utilisateur) {
        throw new Error("nom d'utilisateur ou mot de passe invalide");
    }
    var token = await saveToken(db, utilisateur);
    var result = {
        token: token,
        id_utilisateur: utilisateur._id,
        id_profile: utilisateur.id_profile,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom
    };

    return result;
}

async function logout(token) {
    var db = await dbconnect.getDb();
    var tokenCollection = db.collection("token");
    await tokenCollection.deleteOne({ token: token });
}

async function findTokenUser(token){
    var db = await dbconnect.getDb();
    var tokenCollection = db.collection('token_utilisateur'); 
    var result = await tokenCollection.findOne({token: token, date_expiration: {$gte: new Date()}});
    if(!result) throw new Error("InvalidToken");
    return result;
}

async function getUtilisateurByProfile(params){
    var db = await dbconnect.getDb();
    var produitCollection = db.collection('Utilisateur');
    var produits = await produitCollection
        .find({...params.crt})
        .toArray();
    return produits;
}

module.exports = {login, logout, getUtilisateurByProfile, inscription, isValidToken, findTokenUser}