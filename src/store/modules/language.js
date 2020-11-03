/**
 * @module:Vuex
 * @name:Language
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
import i18n from "@/plugins/i18n";
import { HTTP } from "@/plugins/api";
import { AUTH } from "@/services/constants";

const state = {
  active_language: process.env.VUE_APP_I18N_LOCALE || "en",
  all_languages: [
    {
      name: "English",
      key: "en",
    },
    {
      name: "French",
      key: "fr",
    },
  ],
  test_user: "",
};
const getters = {
  get_language: () => {
    let active_language = localStorage.getItem("active_language");
    return active_language != "undefined" ? active_language : "en";
  },

  all_languages: () => {
    return state.all_languages;
  },
  get_test_user: () => {
    return state.test_user;
  },
};
const actions = {
  //swith language and save it to local
  switch_language: ({ commit, state }, selected_language) => {
    commit("SET_ACTIVE_LANGUAGE", selected_language);
  },

  async me({ commit, state }, data) {
    return await new Promise((resolve, reject) => {
      HTTP.get(AUTH.GET_PROFILE)
        .then((response) => {
          if (response.data.success) {
            commit("SET_NEW_USER", response.data.data);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
const mutations = {
  //set active language
  SET_ACTIVE_LANGUAGE: (state, lang) => {
    state.active_language = lang;
    i18n.locale = lang;
    localStorage.setItem("active_language", lang);
    window.lang = lang;
  },
  SET_NEW_USER: (state, data) => {
    state.test_user = data.name;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
