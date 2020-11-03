/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
import Vue from "vue";
import router from "@/router";
import { AXIOS, HTTP, NOTIFY } from "@/plugins/api";

const state = {
  token: "",
  loader: false,

};
/**
 * getters
 * @type {{isAuth(): boolean, getUser(): user object}}
 */
const getters = {
  //get token
  token: (state) => !!state.token,
};
/**
 * actions
 * @type {{}}
 */
const actions = {
  /**
   * Sign in User
   * @param commit
   * @param state
   * @constructor
   */
  pushNotification({ commit, dispatch }, token) {
    commit("SET_LOADER", true);
    const payload = {
      to: state.token,
      notification: {
        sound: "default",
        body: "test body",
        title: "test title",
        content_available: true,
        priority: "high",
      },
      data: {
        sound: "default",
        body: "test body",
        title: "test title",
        content_available: true,
        priority: "high",
      },
    };
    NOTIFY.post(`https://fcm.googleapis.com/fcm/send`, payload)
      .then(function(response) {
        Vue.notify({
          group: "topNotification",
          type: "success",
          title: "Successfully LoggedIn!...",
        });
      })
      .catch(function(err) {
        commit("SET_LOADER", false);

        Vue.notify({
          group: "auth",
          type: "error",
          title: err.response.data.message,
        });
      });
  },
};

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_LOADER(state, data) {
    state.loader = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
