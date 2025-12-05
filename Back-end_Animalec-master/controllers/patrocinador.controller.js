const Patrocinador = require("../models/patrocinador.model");
const { validationResult } = require("express-validator");
const PatrocinadorMessages = require("../messages/patrocinador.messages");

// ------------------------------------------------------------
// GET /patrocinadores
// ------------------------------------------------------------
exports.get = (req, res) => {
    Patrocinador.find(req.query).exec((error, patrocinadores) => {
        if (error) throw error;

        let message = PatrocinadorMessages.success.s2;

        if (!patrocinadores || patrocinadores.length === 0) {
            message = PatrocinadorMessages.success.s5;
        }

        message.body = patrocinadores;
        return res.status(message.http).send(message);
    });
};

// ------------------------------------------------------------
// GET /patrocinadores/:id
// ------------------------------------------------------------
exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Patrocinador.findOne({ _id: req.params.id }).exec((error, patrocinador) => {
        if (error) throw error;

        if (!patrocinador) {
            return res
                .status(PatrocinadorMessages.error.e0.http)
                .send(PatrocinadorMessages.error.e0);
        }

        let message = PatrocinadorMessages.success.s2;
        message.body = patrocinador;

        return res.status(message.http).send(message);
    });
};

// ------------------------------------------------------------
// POST /patrocinadores
// ------------------------------------------------------------
// POST /patrocinadores
// POST /patrocinadores
// ------------------------------------------------------------
// POST /patrocinadores
// ------------------------------------------------------------
exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  const {
    nome,
    logotipoUrl,
    areaSetor,
    nivelPatrocinioId,
    nivelPatrocinioNome,
    emailContacto,
    website,
    descricaoNotas,
    active
  } = req.body;

  // validação mínima alinhada com o $jsonSchema
  if (!nome || !emailContacto || !nivelPatrocinioId) {
    return res.status(400).send({
      code: "PatrocinadorInvalid",
      message:
        "Os campos 'nome', 'emailContacto' e 'nivelPatrocinioId' são obrigatórios.",
      type: "error"
    });
  }

  const novoPatrocinador = new Patrocinador({
    nome,
    emailContacto,
    nivelPatrocinioId,
    nivelPatrocinioNome: nivelPatrocinioNome || "",
    logotipoUrl: logotipoUrl || "",
    areaSetor: areaSetor || "",
    website: website || "",
    descricaoNotas: descricaoNotas || "",
    active: active !== undefined ? active : true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  novoPatrocinador.save((error, patrocinador) => {
    if (error) {
      console.error("Erro ao gravar patrocinador:", error);
      return res.status(400).send({
        code: "PatrocinadorMongoValidationError",
        message: error.errmsg || "Erro de validação no MongoDB.",
        type: "error",
        details: error.errInfo || null
      });
    }

    let message = PatrocinadorMessages.success.s0;
    message.body = patrocinador;

    return res
      .header("location", "/patrocinadores/" + patrocinador._id)
      .status(message.http)
      .send(message);
  });
};

// ------------------------------------------------------------
// PUT /patrocinadores/:id
// ------------------------------------------------------------
exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    let updateData = {
        ...req.body,
        updatedAt: Date.now()
    };

    Patrocinador.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updateData },
        { new: true },
        (error, patrocinador) => {
            if (error) throw error;

            if (!patrocinador) {
                return res
                    .status(PatrocinadorMessages.error.e0.http)
                    .send(PatrocinadorMessages.error.e0);
            }

            let message = PatrocinadorMessages.success.s1;
            message.body = patrocinador;
            return res.status(message.http).send(message);
        }
    );
};

// ------------------------------------------------------------
// DELETE /patrocinadores/:id
// ------------------------------------------------------------
exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Patrocinador.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) throw error;

        if (result.deletedCount <= 0) {
            return res
                .status(PatrocinadorMessages.error.e0.http)
                .send(PatrocinadorMessages.error.e0);
        }

        return res
            .status(PatrocinadorMessages.success.s3.http)
            .send(PatrocinadorMessages.success.s3);
    });
};

// ------------------------------------------------------------
// PUT /patrocinadores/deactivate/:id
// ------------------------------------------------------------
exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Patrocinador.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { active: false, updatedAt: Date.now() } },
        { new: true },
        (error, patrocinador) => {
            if (error) throw error;

            if (!patrocinador) {
                return res
                    .status(PatrocinadorMessages.error.e0.http)
                    .send(PatrocinadorMessages.error.e0);
            }

            let message = PatrocinadorMessages.success.s4;
            message.body = patrocinador;
            return res.status(message.http).send(message);
        }
    );
};

// ------------------------------------------------------------
// PUT /patrocinadores/activate/:id
// ------------------------------------------------------------
exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Patrocinador.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { active: true, updatedAt: Date.now() } },
        { new: true },
        (error, patrocinador) => {
            if (error) throw error;

            if (!patrocinador) {
                return res
                    .status(PatrocinadorMessages.error.e0.http)
                    .send(PatrocinadorMessages.error.e0);
            }

            let message = PatrocinadorMessages.success.s6;
            message.body = patrocinador;

            return res.status(message.http).send(message);
        }
    );
};
