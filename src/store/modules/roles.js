import Vue from "vue";
import router from "@/router";
import { HTTP } from "@/plugins/api";
import { ACCESS } from "@/services/constants";

/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
const state = {
  allRoles: [],
  rolePermission: {},
  loader: false,
};
const getters = {
  loading: (state) => state.loader,
  allRoles: (state) => state.allRoles,
  rolePermission: (state) => state.rolePermission,
};
const actions = {
  getAllRoles({ rootGetters, commit, state }, data) {
    commit("SET_LOADER", true);
    HTTP.get(ACCESS.GET_ALL_ROLES)
      .then((response) => {
        commit("SET_LOADER", false);
        commit("SET_ALL_ROLES", response.data.data);
      })
      .catch((err) => {
        commit("SET_LOADER", false);
      });
  },

  getSingleRole({ commit, dispatch }, name) {
    const CName = state.allRoles.find((r) => r.name === name);
    const data = {
      id: CName._id,
      page: 0,
    };
    dispatch("users/getCategoryUserList", data, { root: true });
  },

  createRole({ commit, state }, data) {
    commit("SET_LOADER", true);
    HTTP.get(ACCESS.CREATE_ROLE, data)
      .then((response) => {
        commit("SET_LOADER", false);
        // commit('SET_SINGLE_POWER_STATION', data);
        Vue.notify({
          group: "app",
          type: "success",
          title: "Successfully Registered!",
        });
      })
      .catch((err) => {
        commit("SET_LOADER", false);
      });
  },

  deleteRole({ commit, state }, id) {
    commit("SET_LOADER", true);
    HTTP.delete(ACCESS.DELETE_ROLE, id)
      .then((response) => {
        commit("SET_LOADER", false);
        Vue.notify({
          group: "app",
          type: "success",
          title: "Successfully Deleted!",
        });
      })
      .catch((err) => {
        commit("SET_LOADER", false);
      });
  },

  updateRole({ commit, state }, data) {
    commit("SET_LOADER", true);
    HTTP.get(POWER_STATION.UPDATE, data)
      .then((response) => {
        commit("SET_LOADER", false);
        // commit('SET_SINGLE_POWER_STATION', data);
        Vue.notify({
          group: "app",
          type: "success",
          title: "Successfully Updated!",
        });
      })
      .catch((err) => {
        commit("SET_LOADER", false);
      });
  },
};
const mutations = {
  SET_ALL_POWER_STATIONS: (state, data) => {
    state.Stationlist = data;
  },
  SET_LOADER: (state, data) => {
    state.loader = data;
  },
  SET_ALL_ROLES: (state, data) => {
    state.allRoles = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
