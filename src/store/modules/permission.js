/**
 * @module:Vuex
 * @name:Permissions
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */

import Vue from "vue";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import router from "@/router";
import { ACCESS } from "@/services/constants";
import i18n from "@/plugins/i18n";

const state = {
  all_roles: [],
  all_permissions: [],
  user_permissions: [],
  single_role: "",
  loading: false,
};

const getters = {
  get_all_user_roles: (state) => {
    return state.all_roles;
  },

  get_all_permissions: (state) => {
    return state.all_permissions;
  },
};
const actions = {
  /**
   * Check access control for logged in users
   */
  async isAccess({ commit, state, dispatch }, key) {
    return await new Promise((resolve, reject) => {
      //get the user role id
      let role_id;
      if (this.state.auth.myProfile.roleID[0]._id == undefined) {
        dispatch("auth/me", {}, { root: true }).then((response) => {
          //if key have users.view
          if (!key.includes("users")) {
            //check if given 'key' is available in the permissions array
            if (
              state.user_permissions.permissions.some((p) => p.value == key)
            ) {
              resolve(true);
            } else {
              reject(false);
              Vue.notify({
                group: "app",
                type: "error",
                title: "Permission denied !",
              });
            }
          } else {
            resolve(true);
          }
        });
      } else {
        role_id = this.state.auth.myProfile.roleID[0]._id;
      }
      //dispatch get role and get all available permissions for user
      dispatch("getRole", role_id).then((response) => {
        //check if given 'key' is available in the permissions array
        if (state.user_permissions.permissions.some((p) => p.value == key)) {
          resolve(response);
        } else {
          Vue.notify({
            group: "app",
            type: "error",
            title: "Permission denied !",
          });
        }
      });
    });
  },

  /**
   * Get all permissions
   */
  async allPermissions({ commit, dispatch, state }) {
    commit("PROGRESS", true);
    try {
      return await new Promise((resolve, reject) => {
        HTTP.get(ACCESS.GET_ALL_PERMISSIONS)
          .then((response) => {
            if (response.data.success) {
              commit("SET_ALL_PERMISSIONS", response.data.data);
              commit("PROGRESS", false);
              resolve(response);
            }
          })
          .catch((error) => {
            commit("PROGRESS", false);
            Vue.notify({
              group: "app",
              type: "error",
              title: i18n.t("error.error_loading_permissions"),
            });
            reject(error);
          });
      });
    } catch (error) {
      Vue.notify({
        group: "app",
        type: "error",
        title: i18n.t("error.error_loading_permissions"),
      });
      reject(error);
    }
  },
  /**
   * Get all roles
   */
  async allRoles({ commit, dispatch, state }) {
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCESS.GET_ALL_ROLES)
        .then((response) => {
          commit("SET_ALL_ROLES", response.data.data);
          resolve(response);
          commit("PROGRESS", false);
        })
        .catch((error) => {
          Vue.notify({
            group: "app",
            type: "error",
            title: i18n.t("error.error_loading_all_roles"),
          });
          reject(error);
        });
    });
  },

  /**
   * Get single role by role id
   */
  async getRole({ commit, state }, id) {
    commit("PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCESS.GET_SINGLE_ROLE + `${id}`)
        .then((response) => {
          commit("SET_USER_ROLE", response.data.data);
          commit("PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("PROGRESS", false);

          reject(error);
        });
    }).catch((error) => {
      commit("PROGRESS", false);

      reject(error);
    });
  },

  /**
   * Create new role
   */
  async createRole({ commit, dispatch, state }, data) {
    commit("PROGRESS", true);

    // get the permission key
    const key = "permissions.create";
    //check permissions for delete
    return await dispatch("permission/isAccess", key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          HTTP.post(ACCESS.CREATE_ROLE, data)
            .then((response) => {
              resolve(response);
              commit("PROGRESS", false);
            })
            .catch((error) => {
              reject(error);
            });
        });
      })
      .catch((error) => {});
  },
  /**
   * Update role
   */

  async updateRole({ commit, dispatch, state }, data) {
    commit("PROGRESS", true);
    // get the permission key
    const key = "permissions.update";
    //check permissions for delete
    return await dispatch("permission/isAccess", key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          HTTP.put(ACCESS.UPDATE_ROLE + `${data.id}`, data.role)
            .then((response) => {
              commit("SET_SINGLE_ROLE", response.data.data);
              commit("PROGRESS", false);
              Vue.notify({
                group: "app",
                type: "success",
                title: i18n.t("success.role_updated_successfully"),
              });
              resolve(response);
            })
            .catch((error) => {
              commit("PROGRESS", false);

              reject(error);
            });
        });
      })
      .catch((error) => {});
  },
  /**
   * Delete role
   */
  async deleteRole({ commit, dispatch, state }, id) {
    commit("PROGRESS", true);
    // get the permission key
    const key = "permissions.delete";
    //check permissions for delete
    return await dispatch("permission/isAccess", key, { root: true })
      .then((response) => {
        new Promise((resolve, reject) => {
          HTTP.delete(ACCESS.DELETE_ROLE + `${id}`)
            .then((response) => {
              commit("SET_ALL_ROLES", response.data.data);
              resolve(response);
              commit("PROGRESS", false);
              Vue.notify({
                group: "app",
                type: "success",
                title: "successfully deleted",
              });
            })
            .catch((error) => {
              commit("PROGRESS", false);
              reject(error);
            });
        });
      })
      .catch((error) => {});
  },
};

const mutations = {
  PROGRESS: (state, data) => {
    state.loading = data;
  },
  SET_USER_ROLE: (state, data) => {
    // state.user_permissions.splice(0, state.user_permissions.length);
    state.user_permissions = data;
  },
  SET_ALL_PERMISSIONS: (state, data) => {
    // state.all_permissions.splice(0, state.all_permissions.length);
    state.all_permissions = data;
  },
  SET_ALL_ROLES: (state, data) => {
    //  state.all_roles.splice(0, state.all_roles.length);
    state.all_roles = data;
  },
  SET_SINGLE_ROLE: (state, data) => {
    state.single_role = data;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
