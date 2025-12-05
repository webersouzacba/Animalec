// models/niveisPatrocinio.model.js
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NiveisPatrocinioSchema = new Schema(
  {
    nome: { type: String, required: true },   // Bronze, Prata, Ouro, Platina
    ordem: { type: Number, required: true },  // 1, 2, 3, 4
    descricao: { type: String },              // "Nível de entrada", etc.
    criadoEm: { type: Date, default: Date.now }
  },
  {
    collection: "niveis_patrocinio"           // mesma collection que está no Mongo
  }
);

// ⚠️ IMPORTANTE: usar a MESMA connection global, como em especialista.model
module.exports = global.mongoConnection.model(
  "niveis_patrocinio",      // nome do model (pode ser assim mesmo)
  NiveisPatrocinioSchema,
  "niveis_patrocinio"       // nome exato da collection
);
