// models/patrocinador.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../config/config");

// Schema alinhado com o JSON enviado pelo front e com o $jsonSchema do Mongo
const patrocinadorSchema = new Schema({
  nome: { type: String, required: true },

  emailContacto: { type: String, required: true },

  nivelPatrocinioId: {
    type: Schema.Types.ObjectId,
    ref: CONFIG.mongodb.collections.nivel_patrocinio,
    required: true
  },

  nivelPatrocinioNome: { type: String },

  logotipoUrl: { type: String },   // URL do logotipo
  areaSetor: { type: String },     // área / setor do patrocinador
  website: { type: String },       // site do patrocinador
  descricaoNotas: { type: String },

  active: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.patrocinador,
  patrocinadorSchema
);
