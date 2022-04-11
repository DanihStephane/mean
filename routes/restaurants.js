const express = require("express");
const { restaurantService, authService } = require("../services");
const { responseBuilder, tools } = require("../utils");
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        await authService.isValidToken(req.headers.authorization, 1);
        restaurantService
            .findRestaurants(req.body)
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
