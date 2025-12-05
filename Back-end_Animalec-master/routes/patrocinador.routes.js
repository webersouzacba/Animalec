// routes/patrocinadores.routes.js
const express = require("express");
const router = express.Router();

const patrocinadorController = require("../controllers/patrocinador.controller");
// const patrocinadorValidation = require("../validations/patrocinador.validation");

/// GET /api/patrocinadores
router.get("/", patrocinadorController.get);

/// GET /api/patrocinadores/:id
router.get("/:id", patrocinadorController.getOne);

/// POST /api/patrocinadores
router.post(
  "/",
  // patrocinadorValidation.create,
  patrocinadorController.create
);

/// PUT /api/patrocinadores/:id
router.put(
  "/:id",
  // patrocinadorValidation.update,
  patrocinadorController.update
);

/// DELETE /api/patrocinadores/:id
router.delete(
  "/:id",
  // patrocinadorValidation.delete,
  patrocinadorController.delete
);

/// PATCH /api/patrocinadores/:id/activate
router.patch(
  "/:id/activate",
  // patrocinadorValidation.activate,
  patrocinadorController.activate
);

/// PATCH /api/patrocinadores/:id/deactivate
router.patch(
  "/:id/deactivate",
  // patrocinadorValidation.deactivate,
  patrocinadorController.deactivate
);

module.exports = router;
