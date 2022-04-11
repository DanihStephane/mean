const express = require("express");
const { commandeService, authService } = require("../services");
const { responseBuilder, tools } = require("../utils");
const router = express.Router();

router.post("/", async function (req, res) {
    try {
        await authService.isValidToken(req.headers.authorization, 1);
        commandeService
            .creationCommande(req.body)
            .then((result) => {
                res.json(responseBuilder.success(result));
            })
            .catch((error) => {
                res.json(responseBuilder.error(error.message));
            });
    } catch (error) {
        res.json(responseBuilder.error(error.message));
    }
});

module.exports = router;
