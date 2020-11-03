import Vue from "vue";
import router from "@/router";
import { HTTP } from "@/plugins/api";
import { POWER_STATION } from "@/services/constants";
import i18n from "@/plugins/i18n";
/**
 * @module:Vuex
 * @name:Auth
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
const state = {
  stations_list: [],
  bind_stations: [],
  single_station: [],
  power_banks: [],
  locations: '',
  loader: false,
  pagination: {
    total: 0,
    limit: 0,
    page: 1,
    pages: 0,
  },
};
const getters = {
  allStations: (state) => state.stations_list,
  bindStations: (state) => state.bind_stations,
  singleStation: (state) => state.single_station,
  StationlistLength: (state) => state.Stationlist.length,
  powerBanks: (state) => state.power_banks,
  oneLocation: (state) => state.locations,
  paginations: (state) => {
    return state.pagination;
  },
  loader: (state) => {
    state.loader;
  },
};
const actions = {
  /**
   * Sync stations
   */
  async syncStations({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      HTTP.get(POWER_STATION.SYNC)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: "Powerstations synced !",
            });

            dispatch("getAllStations");
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   * active Power stations
   */
  async activePowerStation({ commit, dispatch }, id) {
    return await new Promise((resolve, reject) => {
      HTTP.get(POWER_STATION.ACTIVE + id)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: "Powerstation Activated !",
            });

            dispatch("getSingleStation", id);
            resolve(response);
          } else {
            Vue.notify({
              group: "app",
              type: "success",
              title: response.data.message,
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   * deactive Power Station
   */
  async deactivePowerStation({ commit, dispatch }, id) {
    return await new Promise((resolve, reject) => {
      HTTP.get(POWER_STATION.DEACTIVE + id)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: "Powerstation Deactivated !",
            });

            dispatch("getSingleStation", id);
            resolve(response);
          } else {
            Vue.notify({
              group: "app",
              type: "success",
              title: response.data.message,
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /**
   * detach Power Station
   */
  async detachPowerStation({ commit, dispatch }, id) {
    return await new Promise((resolve, reject) => {
      HTTP.post(POWER_STATION.DETACH + id)
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "app",
              type: "success",
              title: response.data.message,
            });

            dispatch("getSingleStation", id);
            resolve(response);
          }
        })
        .catch((error) => {
          Vue.notify({
            group: "app",
            type: "error",
            title:
              error.message ||
              "something went wrong while detaching power station",
          });

          reject(error);
        });
    });
  },

  /**
   * Search stations
   */
  async searchStations({ commit, dispatch }, data) {
    commit("loaders/SET_LOADING", true, { root: true });
    return await new Promise((resolve, reject) => {
      HTTP.get(
        POWER_STATION.SEARCH + `?page=${data.page_number}&search=${data.query}`
      )
        .then((response) => {
          if (response.data.success) {
            commit("SET_ALL_POWER_STATIONS", response.data.data);
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
  /**
   * Get all stations
   */
  async getAllStations({ commit }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_LOADING", true, {
        root: true,
      });
      HTTP.get(POWER_STATION.GET_ALL + "?page=" + data)
        .then((response) => {
          commit("loaders/SET_LOADING", false, {
            root: true,
          });
          commit("SET_ALL_POWER_STATIONS", response.data.data);
          resolve(response);
        })
        .catch((err) => {
          commit("loaders/SET_LOADING", false, {
            root: true,
          });
          Vue.notify({
            group: "app",
            type: "error",
            title: i18n.t(err.message),
          });
          reject(err);
        });
    });
  },

  /**
   * Get not assigned stations
   */
  async getStationsToBind({ commit }) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_LOADING", true, {
        root: true,
      });
      HTTP.get(POWER_STATION.NOT_ASSIGNED)
        .then((response) => {
          commit("loaders/SET_LOADING", false, {
            root: true,
          });
          commit("SET_POWER_STATION_TO_BIND", response.data.data);
          resolve(response);
        })
        .catch((err) => {
          commit("loaders/SET_LOADING", false, {
            root: true,
          });
          reject(err);
        });
    }).catch((err) => {
      commit("loaders/SET_LOADING", false, {
        root: true,
      });
    });
  },
  /**
   * Get single station
   */
  async getSingleStation({ commit, dispatch }, id) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_LOADING", true, {
        root: true,
      });
      HTTP.get(POWER_STATION.GET + id)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_LOADING", false, {
              root: true,
            });
            commit("SET_SINGLE_POWER_STATION", response.data.data);
            dispatch("getAllStations");
            resolve(response);
          }
        })
        .catch((err) => {
          commit("loaders/SET_LOADING", false, {
            root: true,
          });
          Vue.notify({
            group: "app",
            type: "error",
            title: i18n.t(err.message),
          });
          reject(err);
        });
    });
  },

  /**
   * Create station
   */
  async createStation({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.post(POWER_STATION.CREATE, data)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_CREATE_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Registered!",
            });
            dispatch("getAllStations");
          }

          resolve(response);
        })
        .catch((err) => {
          commit("loaders/SET_CREATE_BTN_LOADING", false, {
            root: true,
          });
          Vue.notify({
            group: "app",
            type: "error",
            title: err.response.data.message,
          });
          reject(err);
        });
    });
  },
  /**
   * Update station
   */
  async updateStation({ commit, dispatch, state }, data) {
    const id = data.id;
    const payload = data.payload;
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_EDIT_BTN_LOADING", true, {
        root: true,
      });
      HTTP.put(POWER_STATION.UPDATE + id, payload)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_EDIT_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Updated!",
            });
            dispatch("getSingleStation", id);
          }
          resolve(response);
        })
        .catch((err) => {
          commit("loaders/SET_EDIT_BTN_LOADING", false, {
            root: true,
          });
          Vue.notify({
            group: "app",
            type: "error",
            title: err.message || "something went wrong",
          });
          reject(err);
        });
    });
  },

  async deleteStation({ commit, dispatch }, id) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_DELETE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.delete(POWER_STATION.DELETE + id)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_DELETE_BTN_LOADING", false, {
              root: true,
            });

            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Deleted!",
            });
            dispatch("getAllStations");
          }
          commit("loaders/SET_DELETE_DIALOG", false, { root: true });
        })
        .catch((err) => {
          commit("loaders/SET_DELETE_BTN_LOADING", false, {
            root: true,
          });
          Vue.notify({
            group: "app",
            type: "success",
            title: err.response.data.message,
          });
        });
    });
  },
};
const mutations = {
  SET_ALL_POWER_STATIONS: (state, data) => {
    state.stations_list = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: parseInt(data.page),
      pages: data.pages ? data.pages : 1,
    };
  },
  SET_POWER_STATION_TO_BIND: (state, data) => {
    state.bind_stations = data;
  },
  SET_SINGLE_POWER_STATION: (state, data) => {
    state.single_station = data;
    state.power_banks = data.powerBanks;
    state.locations = data.powerStation.location;
  },
  SET_LOADER: (state, data) => {
    state.loader = data;
  },

  SET_PAGE: (state, data) => {
    state.pagination.page = parseInt(data);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
