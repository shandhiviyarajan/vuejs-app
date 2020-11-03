import Vue from "vue";
import i18n from "@/plugins/i18n";
import router from "@/router";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import { USERS } from "@/services/constants";

/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
const state = {
  users: [],
  pagination: {
    total: "",
    limit: "",
    page: 1,
    pages: "",
  },
};
const getters = {
  users: (state) => state.users,
  paginations: (state) => {
    return state.pagination;
  },
};
const actions = {
  async GET_ALL_USERS({ commit, state, dispatch }, data) {
    // get the permission key
    const key = router.app._route.name.toLowerCase() + ".view";
    //check permissions for create
    return await dispatch('permission/isAccess', key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          let api = "";
          switch (data.routeName) {
            case "Admin":
              api = USERS.GET_ADMIN;
              break;
            case "Merchant":
              api = USERS.GET_MERCHANT;
              break;
            case "Technician":
              api = USERS.GET_TECHNICIAL;
              break;
            case "Users":
              api = USERS.GET_END_USERS;
              break;
            default:
              break;
          }
          commit("loaders/SET_LOADING", true, { root: true });
          commit("SET_ALL_USERS", []);
          //Get users from API
           HTTP.get(api + "?page=" + data.page)
            .then((response) => {
              commit("SET_ALL_USERS", response.data.data);
              commit("loaders/SET_LOADING", false, { root: true });
              resolve(response);
            })
            .catch((err) => {
              commit("loaders/SET_LOADING", false, { root: true });
              reject(err);
            });
        });
      })
      .catch(error => {

      });



  },

  /**
  * Search users
  */
  async searchUsers({ commit, dispatch }, data) {
    commit("loaders/SET_LOADING", true, { root: true });
    return await new Promise((resolve, reject) => {
      let api = "";
      switch (data.routeName) {
        case "Admin":
          api = USERS.SEARCH_ADMIN;
          break;
        case "Merchant":
          api = USERS.SEARCH_MERCHANT;
          break;
        case "Technician":
          api = USERS.SEARCH_TECHNICIAN;
          break;
        case "Users":
          api = USERS.SEARCH_END_USERS;
          break;
        default:
          break;
      }
      HTTP.get(api + `?page=${data.page}&search=${data.query}`)
        .then((response) => {
          if (response.data.success) {
            commit("SET_ALL_USERS", response.data.data);
            commit("loaders/SET_LOADING", false, { root: true });

            resolve(response);
          }
        })
        .catch((error) => {
          commit("loaders/SET_LOADING", false, { root: true });
          Vue.notify({
            group: "app",
            type: "error",
            title: i18n.t(err.message),
          });
          reject(error);
        });
    });
  },
  async GET_SINGLE_USERS({ commit, state }, userCat) {
    return await new Promise((resolve, reject) => {
      commit("SET_LOADING", true);
      commit("SET_ALL_USERS", data);
    });
  },

  async CREATE_USERS({ commit, dispatch }, data) {
    // get the permission key
    const key = router.app._route.name.toLowerCase() + ".create";
    //check permissions for create
    return await dispatch('permission/isAccess', key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          commit("loaders/SET_CREATE_BTN_LOADING", true, { root: true });
          HTTP.post(USERS.CREATE, data)
            .then((response) => {
              if (response.data.success) {
                Vue.notify({
                  group: "app",
                  type: "success",
                  title: i18n.t("signup.success"),
                });
              }
              commit("loaders/SET_CREATE_BTN_LOADING", false, { root: true });
              //reload
              const data = {
                routeName: router.app._route.name,
                page: 1,
              };
              dispatch("GET_ALL_USERS", data);
              //resolve promise
              resolve(response);
            })
            .catch((err) => {
              commit("loaders/SET_CREATE_BTN_LOADING", false, { root: true });
              Vue.notify({
                group: "app",
                type: "error",
                title: i18n.t("signup.error") + err.response.data.message,
              });
              //reject promise
              reject(err);
            });
        });
      })
      .catch();
  },

  async UPDATE_USERS({ commit, dispatch }, data) {
    const id = data.id;
    const payload = data.payload;

    // get the permission key
    const key = router.app._route.name.toLowerCase() + ".update";
    //check permissions for update
    return await dispatch('permission/isAccess', key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          commit("loaders/SET_EDIT_BTN_LOADING", true, { root: true });
          HTTP.put(USERS.UPDATE + id, payload)
            .then((response) => {
              if (response.data.success) {
                Vue.notify({
                  group: "app",
                  type: "success",
                  title: i18n.t("signup.updated_success"),
                });
                resolve(response);
              }
              commit("loaders/SET_EDIT_BTN_LOADING", false, { root: true });

              let type = {};
              if (data.type) {
                type = {
                  routeName: data.type,
                  page: 1,
                };
              } else {
                type = {
                  routeName: router.app._route.name,
                  page: 1,
                };
              }

              dispatch("users/GET_ALL_USERS", type, { root: true });
              //resolve promise
              resolve(response);
            })
            .catch((err) => {
              commit("loaders/SET_EDIT_BTN_LOADING", false, { root: true });

              if (err.response.data.message === "VALIDATION_ERROR") {
                Vue.notify({
                  group: "app",
                  type: "error",
                  title: err.response.data.message,
                });
              } else {
                Vue.notify({
                  group: "app",
                  type: "error",
                  title: i18n.t("signup.error ") + " " + err.response.data.message,
                });
              }

              reject(err);
            });
        });
      })
      .catch((error) => {
        reject(error);
      });
  },

  async DELETE_USERS({ commit, dispatch }, id) {
    // get the permission key
    const key = router.app._route.name.toLowerCase() + ".delete";
    //check permissions for delete
    return await dispatch('permission/isAccess', key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          commit("loaders/SET_DELETE_BTN_LOADING", true, { root: true });
          HTTP.delete(USERS.DELETE + id)
            .then((response) => {
              if (response.data.success) {
                commit("loaders/SET_DELETE_BTN_LOADING", false, { root: true });
                Vue.notify({
                  group: "app",
                  type: "success",
                  title: response.data.message,
                });
              } else {
                commit("loaders/SET_DELETE_BTN_LOADING", false, { root: true });
                Vue.notify({
                  group: "app",
                  type: "error",
                  title: response.data.message,
                });
              }
              commit("loaders/SET_DELETE_DIALOG", false, { root: true });
              //reload
              const data = {
                routeName: router.app._route.name,
                page: 1,
              };
              dispatch("users/GET_ALL_USERS", data, { root: true });

              //resolve promise
              resolve(response);
            })
            .catch((err) => {
              commit("loaders/SET_DELETE_BTN_LOADING", false, { root: true });
              Vue.notify({
                group: "app",
                type: "error",
                title: err.response.data.message,
              });
              //reject promise
              reject(err);
            });
        });
      })
      .catch((error) => {

      })


  },
};
const mutations = {
  SET_ALL_USERS(state, data) {
    state.users = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };


  },
  SET_LOADING(state, data) {
    state.loading = data;
  },
  SET_PAGE: (state, data) => {
    state.pagination.page = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
