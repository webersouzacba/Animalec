// src/api/patrocinador.service.js
import API_URL from "./config.js";

const patrocinadorService = {
  async getSponsors(token) {
    const response = await fetch(`${API_URL}/patrocinadores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return await response.json(); // mensagem completa (com body)
  },

  async getSponsor(token, id) {
    const response = await fetch(`${API_URL}/patrocinadores/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return await response.json();
  },

  async addSponsor(token, data) {
    const response = await fetch(`${API_URL}/patrocinadores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    });
    return response;
  },

  async editSponsor(token, id, data) {
    const response = await fetch(`${API_URL}/patrocinadores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(data)
    });
    return response;
  },

  async deleteSponsor(token, id) {
    const response = await fetch(`${API_URL}/patrocinadores/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });
    return response;
  }
};

export default patrocinadorService;
