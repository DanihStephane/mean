const express = require('express');
const {ekalyService, authService} = require('../services');
const {responseBuilder, tools} = require('../utils');
const router = express.Router();


/*-----------------------RESTAURANT-----------------------*/
/* ajouter nouveau restaurant */
router.post('/restaurant', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    console.log(req.body);
    var params = { restaurant: req.body }
    ekalyService
    .createRestaurant(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* recuperer tous les restaurants */
router.get('/restaurants', async function(req, res){
    var params = {crt: {}, search: "", pageNumber: req.body.pageNumber, nPerPage: req.body.nPerPage};
    ekalyService
    .getRestaurants(params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* recuperer un restaurant */
router.get('/:id_restaurant', async function(req, res){
    var params = {crt: { _id: new ObjectId(req.body.id_restaurant) }, search: "", pageNumber: 1, nPerPage: 1};
    ekalyService
    .getRestaurants(params)
    .then((result) => {
        res.json(responseBuilder.success(result, "SUCCESS"));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* modifier un restaurant */
router.put('/restaurant', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {crt: { _id: new ObjectId(req.body._id) }, restaurant: req.body};
    ekalyService
    .updateRestaurant(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* supprimer un restaurant */
router.delete('/:id_restaurant', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = { crt: { _id: new ObjectId(req.body.id_restaurant) } };
    ekalyService
    .deleteRestaurant(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});


/*-----------------------Livreur-----------------------*/
/* ajouter nouveau livreur */
router.post('/livreur', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = { livreur: req.body }
    ekalyService
    .createLivreur(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* recuperer tous les livreurs */
router.get('/livreurs', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {crt: {}, search: "", pageNumber: req.body.pageNumber, nPerPage: req.body.nPerPage};
    ekalyService
    .getLivreurs(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* recuperer tous un livreur */
router.get('/:id_livreur', async function(req, res){
    var params = {crt: { _id: new ObjectId(req.body.id_livreur) }, search: "", pageNumber: 1, nPerPage: 1};
    ekalyService
    .getRestaurants(params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* modifier un livreur */
router.put('/livreur', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {crt: { _id: new ObjectId(req.body._id) }, livreur: req.body};
    ekalyService
    .updateLivreur(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* supprimer un livreur */
router.delete('/:id_livreur', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = { crt: { _id: new ObjectId(req.body.id_livreur) } };
    ekalyService
    .deleteLivreur(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});


/*-----------------------COMMANDE-----------------------*/
/* recuperer toutes les commandes */
router.get('/commandes', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {crt: {}, search: "", pageNumber: req.body.pageNumber, nPerPage: req.body.nPerPage};
    ekalyService
    .getCommandes(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* recuperer une commandes */
router.get('/:id_commande', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {crt: { _id: new ObjectId(req.body.id_commande) }, search: "", pageNumber: 1, nPerPage: 1};
    ekalyService
    .getCommandes(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/* assigner une commande à un livreur */
router.put('/commande', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);

    var params = {crt: { _id: new ObjectId(req.body._id) }, commande: req.body};
    ekalyService
    .updateCommande(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});

/*-----------------------BENEFICE-----------------------*/
/** Benefice ekaly */
router.get('/benefices', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {fieldGroup: "", pageNumber: 1, nPerPage: 1};
    ekalyService
    .getBenefices(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});


/** Benefice par categorie */
router.get('/benefice', async function(req, res){
    const token = tools.extractToken(req.headers.authorization);
    const tokenUtilisateur = await authService.findTokenUser(token);
    var params = {fieldGroup: "$"+req.body.fieldGroup, pageNumber: req.body.pageNumber, nPerPage: req.body.nPerPage};
    ekalyService
    .getCommandes(tokenUtilisateur.utilisateur, params)
    .then((result) => {
        res.json(responseBuilder.success(result));
    })
    .catch((error) => {
        res.json(responseBuilder.error(error.message));
    })
});


module.exports = router;