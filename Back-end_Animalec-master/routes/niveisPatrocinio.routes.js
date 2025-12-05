// routes/niveisPatrocinio.routes.js
const express = require("express");
const router = express.Router();

const niveisController = require("../controllers/niveisPatrocinio.controller");
// const niveisValidation = require("../validations/niveisPatrocinio.validation");

/// GET /api/niveis-patrocinio
router.get("/", niveisController.get);

/// (Opcional) GET /api/niveis-patrocinio/:id
router.get("/:id", niveisController.getOne);

module.exports = router;
