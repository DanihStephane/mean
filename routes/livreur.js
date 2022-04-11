const express = require('express');
const {livreurService,authService} = require('../services');
const {responseBuilder, tools} = require('../utils');
const router = express.Router();

//Récuperation des livraisons (à partir d'un livreur)
//Critère an'ito tsy id an'ilay livreur (mila hay ny maka azy)
router.get('/', async function(req, res){
    var params = {crt: { id_livreur: req.body.crt.id_livreur }, pageNumber: req.body.pageNumber, nPerPage: req.body.nPerPage}
    try{
        const token = tools.extractToken(req.headers.authorization);
        const tokenUtilisateur = await authService.findTokenUser(token);
        const result = await livreurService.getLivraison(tokenUtilisateur.utilisateur,params);
        res.json(responseBuilder.success(result));
    } catch(error){
        res.json(responseBuilder.error(error.message));
    }
});

//Valider une commande lors su livraison  (modification de l'etat dans commande)
router.put('/update', async function(req, res){
    var params = {crt: { id_commande: req.body.crt._id }, commande: req.body.data.commande};
    try{
        const token = tools.extractToken(req.headers.authorization);
        const tokenUtilisateur = await authService.findTokenUser(token);
        const result = await livreurService.updateCommandeLivraison(tokenUtilisateur.utilisateur,params)
        res.json(responseBuilder.success(result));
    } catch(error){
        res.json(responseBuilder.error(error.message));
    }
});

module.exports = router;

