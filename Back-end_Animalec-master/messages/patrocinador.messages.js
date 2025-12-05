// messages/patrocinador.messages.js

module.exports = {
  success: {
    s0: { code: "PatrocinadorCreated", http: 201, type: "success" },
    s1: { code: "PatrocinadorUpdated", http: 200, type: "success" },
    s2: { code: "PatrocinadorFound",   http: 200, type: "success" },
    s3: { code: "PatrocinadorDeleted", http: 200, type: "success" },
    s5: { code: "NoPatrocinadores",     http: 200, type: "success" }
  },
  error: {
    e0: { code: "PatrocinadorNotFound",   http: 404, type: "error" },
    e1: { code: "PatrocinadorEmailInUse", http: 409, type: "error" }
  }
};
