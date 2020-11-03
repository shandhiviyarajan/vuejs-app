/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
import Vue from "vue";
import axios from "axios";
import router from "@/router";
import { AXIOS, HTTP } from "@/plugins/api";
import { AUTH } from "@/services/constants";
import i18n from "@/plugins/i18n";

const state = {
  token: localStorage.getItem("token") || "",
  authToken: "",
  status: "",
  loader: false,
  user: "",
  myProfile: {},
};
/**
 * getters
 * @type {{isAuth(): boolean, getUser(): user object}}
 */
const getters = {
  //Auth true or false
  isAuthenticated: (state) => !!state.token,
  //status
  authStatus: (state) => state.status,
  //Get current user
  user: (state) => {
    return state.user;
  },
  //Loader
  loader: (state) => {
    return state.loader;
  },
  //Get username
  username: (state) => {
    return state.user.name;
  },
  //Check is user is logged in or not
  isAuth: (state) => {
    return state.is_auth;
  },
  myProfile: (state) => {
    return state.myProfile;
  },
};
/**
 * actions
 * @type {{}}
 */

/**
 * Create power stations
 */

const actions = {
  /**
   * Sign in User
   */

  async LOGIN({ commit, dispatch, state }, data) {
    commit("SET_LOADER", true);
    return await new Promise((resolve, reject) => {
      HTTP.post(AUTH.LOGIN, data.form)
        .then((response) => {
          //set loading

          if (response.data.success) {


            //set localstorate auth token and refresh token
            const auth_token = response.data.data.accessToken;

            const refresh_token = response.data.data.refreshToken;
            localStorage.setItem("token", auth_token);
            localStorage.setItem("refresh_token", refresh_token);
            /*set to localstorage for generate new token 
            only if remember be is true
            */
            if (data.isRemember) {
              commit("SET_REMEMBER_ME", data.isRemember);
            }






            //firebase logs

            //redirect route with delay

            commit("AUTH_SUCCESS", auth_token);
            //unset loading
            commit("SET_LOADER", false);
            //fetch profile//
            dispatch("me");

            Vue.notify({
              group: "auth",
              type: "success",
              title: i18n.t("login.success"),
            });

            setTimeout(() => {
              router.push({
                name: "Welcome",
              });
            },1000);

            //resolve promise
            resolve(response);
          }
        })
        .catch((e) => {
          commit("AUTH_ERROR", e);
          commit("SET_LOADER", false);
          //login error
          Vue.notify({
            group: "auth",
            type: "error",
            title: i18n.t("login.failed"),
          });
          //reject promoise
          reject(e);
        });
    });
  },

  /**
   * Get Profile
   */
  async me({ commit, dispatch }, state) {
    return await new Promise((resolve, reject) => {
      commit("SET_LOADER", true);
      HTTP.get(AUTH.GET_PROFILE)
        .then((response) => {
          if (response.data.success) {
            commit("SET_LOADER", false);
            commit("SET_USER", response.data.data);
            resolve(response);
          }
        })
        .catch((error) => {
          commit("SET_LOADER", false);
          dispatch("logout");
          router.push({
            name: "Login",
          });
          reject(error);
        });
    });
  },

  /**
   * Register
   */
  createUser({ commit, dispatch }, userData) {
    commit("SET_LOADER", true);
    AXIOS.post(AUTH.REGISTER, userData)
      .then(function (response) {
        if (response.data.success) {
          Vue.notify({
            group: "auth",
            type: "success",
            title: i18n.t("signup.success"),
          });
          setTimeout(() => {
            commit("SET_LOADER", false);
            router.push({
              name: "Login",
            });
          }, 1000);
        }
      })
      .catch(function (e) {
        commit("AUTH_ERROR", e);
        commit("SET_LOADER", false);

      });
  },

  /**
   * Forget Password
   * @param commit
   * @param state
   * @constructor
   */

  forgetPassword({ commit, state, dispatch }, data) {
    commit("SET_LOADER", true);
    AXIOS.post(AUTH.FORGOT_PASSWORD, data)
      .then(function (response) {
        if (response.data.success) {
          commit("SET_EMAIL", data);

          Vue.notify({
            group: "auth",
            type: "success",
            title: i18n.t("reset.email_sent") + " " + data.email,
          });
          setTimeout(() => {
            commit("SET_LOADER", false);
            router.push({
              name: "Reset",
              query: {
                email: data.email,
              },
            });
          }, 1000);
        }
      })
      .catch((error) => {
        commit("AUTH_ERROR", error);
        commit("SET_LOADER", false);

      });
  },
  /**
   * Sign out
   */
  logout({ commit, state }) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    commit("UN_SET", false);
    commit("SET_LOADER", false);

    router.push({
      name: "Login",
    });
  },

  /**
   * Reset password
   * @param {*} param0
   */
  resetPassword({ commit, state }, reset) {
    commit("SET_LOADER", true);
    AXIOS.post(AUTH.CONFIRM_FORGOT_PASSWORD, reset)
      .then(function (response) {
        if (response.data.success) {
          Vue.notify({
            group: "auth",
            type: "success",
            title: "Password Successfully changed !",
          });
          setTimeout(() => {
            commit("SET_LOADER", false);
            router.push({
              name: "Login",
            });
          }, 1000);
        }
      })
      .catch(function (e) {
        commit("AUTH_ERROR", e);
        commit("SET_LOADER", false);

        Vue.notify({
          group: "auth",
          type: "error",
          title: e.response.data.message,
        });
      });
  },

  // image upload

  async imageUpload({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      HTTP.post(AUTH.IMAGE_UPLOAD, data)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: i18n.t("signup.image_upload_success"),
            });
          }

          dispatch("auth/me", data, { root: true });
          resolve(response);
        })
        .catch((err) => {
          Vue.notify({
            group: "app",
            type: "error",
            title: i18n.t("signup.error") + err.response.data.message,
          });
          //reject promise
          reject(err);
        });
    });
  },

  // image upload

  async imageUpload({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, { root: true });
      HTTP.post(AUTH.IMAGE_UPLOAD, data)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: i18n.t("signup.image_upload_success"),
            });
          }

          commit("loaders/SET_CREATE_BTN_LOADING", false, { root: true });
          dispatch('auth/me', data, { root: true })
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
  },

  async updateUser({ commit, dispatch }, data) {
    const id = data.id;
    const payload = data.payload;

    return await new Promise((resolve, reject) => {
      commit("loaders/SET_EDIT_BTN_LOADING", true, { root: true });
      HTTP.put(AUTH.UPDATE_PROFILE + id, payload)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: i18n.t("signup.updated_success"),
            });
          }
          commit("loaders/SET_EDIT_BTN_LOADING", false, { root: true });
          const data = {
            routeName: router.app._route.name,
            page: 1
          }

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
  },

  async updateUser({ commit, dispatch }, data) {
    const id = data.id;
    const payload = data.payload;

    return await new Promise((resolve, reject) => {
      commit("loaders/SET_EDIT_BTN_LOADING", true, { root: true });
      HTTP.put(AUTH.UPDATE_PROFILE + id, payload)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: i18n.t("signup.updated_success"),
            });
          }
          commit("loaders/SET_EDIT_BTN_LOADING", false, { root: true });
          const data = {
            routeName: router.app._route.name,
            page: 1,
          };

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
  },
};

/**
 * mutations
 */
const mutations = {
  AUTH_SUCCESS: (state, token) => {
    state.status = "success";
    state.authToken = token;
  },
  SET_EMAIL: (state, data) => {
    state.user = {
      email: data.email,
    };
  },
  SET_USER: (state, data) => {
    state.user = data;
    state.myProfile = data;
  },
  AUTH_ERROR: (state) => {
    state.status = "error";
  },
  SET_LOADER(state, data) {
    state.loader = data;
  },
  UN_SET: (state, data) => {
    state.is_auth = false;
    state.token = false;
    state.authToken = false;
    state.status = false;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
