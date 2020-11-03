import Vue from "vue";
import router from "@/router";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import { USERS } from "@/services/constants";

/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
const state = {
  loading: false,
  Cloading: false,
  Eloading: false,
  Dloading: false,
  Ddialog: false,
  http_loading: false,
};
const getters = {
  loading: (state) => state.loading,
  Cloading: (state) => state.Cloading,
  Eloading: (state) => state.Eloading,
  Dloading: (state) => state.Dloading,
  Ddialog: (state) => state.Ddialog,
  http_loading: (state) => {
    state.http_loading;
  },
};
const actions = {};
const mutations = {
  SET_CREATE_BTN_LOADING(state, data) {
    state.Cloading = data;
  },
  SET_EDIT_BTN_LOADING(state, data) {
    state.Eloading = data;
  },
  SET_DELETE_BTN_LOADING(state, data) {
    state.Dloading = data;
  },
  SET_LOADING(state, data) {
    state.loading = data;
  },
  SET_DELETE_DIALOG(state, data) {
    state.Ddialog = data;
  },
  HTTP_LOADING(state, data) {
    state.http_loading = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
