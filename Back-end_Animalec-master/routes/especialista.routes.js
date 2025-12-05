// routes/especialista.routes.js
const express = require('express');
let router = express.Router();
const EspecialistaController = require('../controllers/especialista.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

// /especialistas/
// Lista todos e cria novo especialista
router.route('/')
    .get(
        AuthController.checkAuth,
        EspecialistaController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body('nome').isString(),           // <---
            body('area').isString(),
            body('descricao').isString(),      // <---
            body('email').optional().isEmail(),
            body('telefone').optional().isString(), // <---
            sanitizeBody('descricao').whitelist(
                CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical
            )
        ],
        EspecialistaController.create
    );

// /especialistas/deactivate/:id
router.route('/deactivate/:id')
    .put(
        AuthController.checkAuth,
        [param('id').isMongoId()],
        EspecialistaController.deactivate
    );

// /especialistas/activate/:id
router.route('/activate/:id')
    .put(
        AuthController.checkAuth,
        [param('id').isMongoId()],
        EspecialistaController.activate
    );

// /especialistas/:id
router.route('/:id')
    .get(
        AuthController.checkAuth,
        [param('id').isMongoId()],
        EspecialistaController.getOne
    )
    .put(
        AuthController.checkAuth,
        [param('id').isMongoId()],
        EspecialistaController.update
    )
    .delete(
        AuthController.checkAuth,
        [param('id').isMongoId()],
        EspecialistaController.delete
    );

module.exports = router;



// routes/especialista.routes.js


