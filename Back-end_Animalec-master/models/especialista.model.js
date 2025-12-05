// models/especialista.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const especialistaSchema = new Schema({
    nome: { type: String, required: true },  // <--- campo exigido pelo JSON Schema
    area: String,
    descricao: String,
    email: String,
    telefone: String,
    active: { type: Boolean, default: true }
});

module.exports = global.mongoConnection.model(
    CONFIG.mongodb.collections.especialista,
    especialistaSchema
);
