// messages/especialista.messages.js
module.exports = {
  success: {
    s0: { code: "EspecialistaCreated", http: 201, type: "success" },
    s1: { code: "EspecialistaUpdated", http: 200, type: "success" },
    s2: { code: "EspecialistaFound",   http: 200, type: "success" },
    s3: { code: "EspecialistaDeleted", http: 200, type: "success" },
    s5: { code: "NoEspecialistas",     http: 200, type: "success" }
  },
  error: {
    e0: { code: "EspecialistaNotFound",   http: 404, type: "error" },
    e1: { code: "EspecialistaEmailInUse", http: 409, type: "error" }
  }
};
