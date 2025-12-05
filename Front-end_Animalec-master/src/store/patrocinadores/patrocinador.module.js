// src/store/patrocinadores/patrocinador.module.js
import patrocinadorService from "@/api/patrocinador.service";
import {
  // Actions
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  REMOVE_SPONSOR,
  // Mutations
  SET_SPONSORS,
  SET_MESSAGE
} from "./patrocinador.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorById: state => id => state.sponsors.find(s => s._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      patrocinadorService
        .getSponsors(rootState.auth.token)
        .then(
          res => {
            commit(SET_SPONSORS, res.body);
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      patrocinadorService
        .addSponsor(rootState.auth.token, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `O patrocinador ${res.body.nome} foi adicionado com sucesso!`
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      // aqui suponho que o serviço receba (token, payload) como em especialista
      patrocinadorService
        .editSponsor(rootState.auth.token, payload._id, payload)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              `O patrocinador ${res.body.nome} foi atualizado com sucesso!`
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  },

  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      patrocinadorService
        .deleteSponsor(rootState.auth.token, id)
        .then(
          res => {
            commit(
              SET_MESSAGE,
              "O patrocinador foi removido com sucesso!"
            );
            resolve(res);
          },
          err => {
            commit(SET_MESSAGE, err.message);
            reject(err);
          }
        );
    });
  }
};

export const mutations = {
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
