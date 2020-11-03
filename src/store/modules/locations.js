import Vue from "vue";
import router from "@/router";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import { LOCATION } from "@/services/constants";

/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
const state = {
  all_locations: [],
  merchant_locations: [],
  new_location: [],
  single_location: [],
  progress: false,
};
const getters = {
  allLocations: (state) => state.all_locations,
  merchantLocations: (state) => state.merchant_locations,
  singleLocation: (state) => state.single_location,
  progress: (state) => {
    return state.progress;
  },
};
const actions = {
  //Fetch all locations
  async allLocations({ commit, state }) {
    return await new Promise((resolve, reject) => {
      HTTP.get(LOCATION.GET_ALL)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //Get merhant locations by merchant ID
  async getMerchantLocations({ commit, state }, merchant_id) {
    commit("loaders/HTTP_LOADING", true, { root: true });
    commit("SET_MERCHANT_LOCATIONS", []);
    return await new Promise((resolve, reject) => {
      HTTP.get(LOCATION.GET_MERCHANT_LOCATION + merchant_id)
        .then((response) => {
          if (response.data.success) {
            //set global loader false
            commit("loaders/HTTP_LOADING", false, { root: true });
            //commit merchant locations state
            commit("SET_MERCHANT_LOCATIONS", response.data.data);
            resolve(response);
          } else {
            commit("loaders/HTTP_LOADING", false, { root: true });
            reject(response);
          }
        })
        .catch((error) => {
          commit("loaders/HTTP_LOADING", false, { root: true });
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.data.message,
          });
          reject(error);
        });
    });
  },

  //Get locations by ID
  async getOneLocation({ commit, state }, id) {
    commit("loaders/HTTP_LOADING", true, { root: true });
    return await new Promise((resolve, reject) => {
      HTTP.get(LOCATION.GET_ONE + id)
        .then((response) => {
          if (response.data.success) {
            //set global loader false
            commit("loaders/HTTP_LOADING", false, { root: true });
            //commit locations state
            commit("SET_SINGLE_LOCATIONS", response.data.data);
            resolve(response);
          } else {
            commit("loaders/HTTP_LOADING", false, { root: true });
            reject(response);
          }
        })
        .catch((error) => {
          commit("loaders/HTTP_LOADING", false, { root: true });
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.data.message,
          });
          reject(error);
        });
    });
  },

  //create the new location
  async createLocation({ commit, dispatch, state }, data) {
    commit("loaders/SET_CREATE_BTN_LOADING", true, { root: true });
    // set the permission key
    const key = "location.create";
    //check permissions for update
    await dispatch("permission/isAccess", key, { root: true })
      .then((response) => {
        return new Promise((resolve, reject) => {
          HTTP.post(LOCATION.CREATE, data)
            .then((response) => {
              if (response.data.success) {
                Vue.notify({
                  group: "app",
                  type: "success",
                  title: response.data.message,
                });
                dispatch("getMerchantLocations", data.merchantId);
                commit("loaders/SET_CREATE_BTN_LOADING", false, { root: true });
                setTimeout(() => {
                  resolve(response);
                }, 500);
              }
            })
            .catch((error) => {
              Vue.notify({
                group: "app",
                type: "error",
                title: error.message,
              });
              commit("loaders/SET_CREATE_BTN_LOADING", false, { root: true });
              reject(error);
            });
        });
      })
      .catch((error) => {

      });
  },
  async updateLocation({ commit, state, dispatch }, data) {
    commit("loaders/HTTP_LOADING", true, { root: true });
    commit("loaders/SET_EDIT_BTN_LOADING", true, {
      root: true,
    });
    const id = data.loc_id;
    const payload = data.json_current_location;

    // get the permission key
    const key = "location.edit";
    //check permissions for update
    dispatch("permission/isAccess", key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          HTTP.put(LOCATION.UPDATE + id, payload)
            .then((response) => {
              if (response.data.success) {
                commit("loaders/SET_EDIT_BTN_LOADING", false, {
                  root: true,
                });
                Vue.notify({
                  group: "app",
                  type: "success",
                  title: response.data.message,
                });

                resolve(response);
              }
            })
            .catch((error) => {
              commit("loaders/SET_EDIT_BTN_LOADING", false, {
                root: true,
              });
              Vue.notify({
                group: "app",
                type: "error",
                title: error.message,
              });
              reject(error);
            });
        });
      })
      .catch((error) => { });
  },

  // delete location
  async deleteLocation({ commit, dispatch }, data) {
    const id = data.id;
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_DELETE_BTN_LOADING", true, {
        root: true,
      });
      // get the permission key
      const key = "location.delete";
      //check permissions for delete
      dispatch("permission/isAccess", key, { root: true })
        .then((response) => {
          new Promise((resolve, reject) => {
            HTTP.delete(LOCATION.DELETE + id)
              .then((response) => {
                if (response.data.success) {
                  commit("loaders/SET_DELETE_BTN_LOADING", false, {
                    root: true,
                  });
                  Vue.notify({
                    group: "app",
                    type: "success",
                    title: response.data.message,
                  });
                  dispatch("getMerchantLocations", data.merchant_id);
                  resolve(response);
                }
              })
              .catch((error) => {
                commit("loaders/SET_DELETE_BTN_LOADING", false, {
                  root: true,
                });
                Vue.notify({
                  group: "app",
                  type: "error",
                  title: error.message,
                });
                reject(error);
              });
          });
        })
        .catch((error) => { });
    });
  },
  // deleteLocation({ commit, state }, location_id) {
  //     // get the permission key
  //     const key = "location.delete";
  //     //check permissions for update
  //   dispatch('permission/isAccess', key, { root: true })
  //         .then()
  //         .catch();
  // }
};
const mutations = {
  SET_ALL_LOCATIONS: (state, data) => {
    state.all_locations = data;
  },
  SET_MERCHANT_LOCATIONS: (state, data) => {
    state.merchant_locations = data;
  },
  SET_SINGLE_LOCATIONS: (state, data) => {
    state.single_location = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
