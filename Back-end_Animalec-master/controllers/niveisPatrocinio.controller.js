// controllers/niveisPatrocinio.controller.js

const NivelPatrocinio = require("../models/niveisPatrocinio.model");

// GET /niveisPatrocinio
exports.get = (req, res) => {
  console.log(">>> niveisPatrocinio.controller.get (Mongoose .then)");

  NivelPatrocinio.find({})
    .sort({ ordem: 1 })
    .then(niveis => {
      console.log(">>> niveis encontrados:", niveis.length);

      return res.status(200).json({
        code: "NivelPatrocinioList",
        type: "success",
        http: 200,
        body: niveis
      });
    })
    .catch(error => {
      console.error(">>> Erro Mongo niveis_patrocinio:", error);

      return res.status(500).json({
        code: "NivelPatrocinioError",
        type: "error",
        http: 500,
        message: "Erro ao obter níveis de patrocínio."
      });
    });
};

// GET /niveisPatrocinio/:id (opcional)
exports.getOne = (req, res) => {
  console.log(
    ">>> niveisPatrocinio.controller.getOne (Mongoose .then), id =",
    req.params.id
  );

  NivelPatrocinio.findById(req.params.id)
    .then(nivel => {
      if (!nivel) {
        return res.status(404).json({
          code: "NivelPatrocinioNotFound",
          type: "error",
          http: 404,
          message: "Nível de patrocínio não encontrado."
        });
      }

      return res.status(200).json({
        code: "NivelPatrocinioDetail",
        type: "success",
        http: 200,
        body: nivel
      });
    })
    .catch(error => {
      console.error(">>> Erro Mongo getOne niveis_patrocinio:", error);

      return res.status(500).json({
        code: "NivelPatrocinioError",
        type: "error",
        http: 500,
        message: "Erro ao obter nível de patrocínio."
      });
    });
};
