// controllers/especialista.controller.js

const Especialista = require('../models/especialista.model');
const { validationResult } = require('express-validator');
const EspecialistaMessages = require('../messages/especialista.messages');

// GET /especialistas
exports.get = (req, res) => {
    Especialista.find(req.query).exec((error, especialistas) => {
        if (error) throw error;

        let message = EspecialistaMessages.success.s2;

        if (especialistas.length <= 0) {
            message = EspecialistaMessages.success.s5; // nenhum registro
        }

        message.body = especialistas;
        return res.status(message.http).send(message);
    });
};

// GET /especialistas/:id
exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Especialista.findOne({ _id: req.params.id }).exec((error, especialista) => {
        if (error) throw error;

        if (!especialista) {
            return res
                .status(EspecialistaMessages.error.e0.http)
                .send(EspecialistaMessages.error.e0);
        }

        let message = EspecialistaMessages.success.s2;
        message.body = especialista;
        return res.status(message.http).send(message);
    });
};

// POST /especialistas
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Especialista({
        nome: req.body.nome,
        area: req.body.area,
        descricao: req.body.descricao,
        email: req.body.email,
        telefone: req.body.telefone
    }).save((error, especialista) => {
        // *** IMPORTANTE: só mexe em error SE error != null ***
        if (error) {
            // Trata e-mail duplicado (índice único uk_especialistas_email)
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                const message = EspecialistaMessages.error.e1; // EspecialistaEmailInUse
                return res.status(message.http).send(message);
            }

            // Outros erros → deixa estourar como no resto do projeto
            throw error;
        }

        let message = EspecialistaMessages.success.s0;
        message.body = especialista;

        return res
            .header('location', '/especialistas/' + especialista._id)
            .status(message.http)
            .send(message);
    });
};

// PUT /especialistas/:id
exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Especialista.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        (error, especialista) => {
            if (error) throw error;

            if (!especialista) {
                return res
                    .status(EspecialistaMessages.error.e0.http)
                    .send(EspecialistaMessages.error.e0);
            }

            let message = EspecialistaMessages.success.s1;
            message.body = especialista;
            return res.status(message.http).send(message);
        }
    );
};

// DELETE /especialistas/:id
exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Especialista.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) throw error;

        if (result.deletedCount <= 0) {
            return res
                .status(EspecialistaMessages.error.e0.http)
                .send(EspecialistaMessages.error.e0);
        }

        return res
            .status(EspecialistaMessages.success.s3.http)
            .send(EspecialistaMessages.success.s3);
    });
};

// PUT /especialistas/deactivate/:id
exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Especialista.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { active: false } },
        { new: true },
        (error, especialista) => {
            if (error) throw error;

            if (!especialista) {
                return res
                    .status(EspecialistaMessages.error.e0.http)
                    .send(EspecialistaMessages.error.e0);
            }

            let message = EspecialistaMessages.success.s1; // reaproveita "updated"
            message.body = especialista;
            return res.status(message.http).send(message);
        }
    );
};

// PUT /especialistas/activate/:id
exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Especialista.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { active: true } },
        { new: true },
        (error, especialista) => {
            if (error) throw error;

            if (!especialista) {
                return res
                    .status(EspecialistaMessages.error.e0.http)
                    .send(EspecialistaMessages.error.e0);
            }

            let message = EspecialistaMessages.success.s1;
            message.body = especialista;
            return res.status(message.http).send(message);
        }
    );
};