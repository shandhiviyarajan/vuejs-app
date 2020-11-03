/**
 * @module:Vuex
 * @name:Accounts
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
import Vue from "vue";
import { HTTP } from "@/plugins/api";
import { ACCOUNTS } from "@/services/constants";
import { USERS } from "@/services/constants";

const state = {
  accounts_balance: [],
  transactions: [],
  progress: false,
  refunds: [],
  allTransactions: [],
  allWithdrawnByUser: [],
  allWithdrawn: [],
  merchants: [],
  pagination: {
    total: 0,
    limit: "",
    page: 1,
    pages: 0,
  },
};

const getters = {
  allrefunds: (state) => state.refunds,
  allTransaction: (state) => state.allTransactions,
  allWithdrawnsByUser: (state) => state.allWithdrawnByUser,
  allWithdrawns: (state) => state.allWithdrawn,
  allmerchants: (state) => state.merchants,
  accounts_paginations: (state) => {
    return state.pagination;
  },

  get_accounts_balance: (state) => {
    return state.accounts_balance;
  },

  get_transactions: (state) => {
    return state.transactions
  },

  progress: (state) => {
    return state.progress;
  }
};
const actions = {
  async accountsBalance({ commit, state, dispatch }, merchant_id) {
    commit('SET_PROGRESS', true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.WALLET_BALANCE(merchant_id, 1))
        .then((response) => {
          commit('SET_ACCOUNTS_BALANCE', response.data);
          commit('SET_PROGRESS', false);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_PROGRESS', false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message
          });
          reject(error);
        })
    });
  }

  ,
  async getTransactions({ commit, state, dispatch }, data) {
    commit('SET_PROGRESS', true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.TRANSACTIONS(data.id, data.page))
        .then((response) => {
          commit('SET_TRANSACTIONS', response.data);
          commit('SET_PROGRESS', false);
          resolve(response);
        })
        .catch((error) => {
          commit('SET_PROGRESS', false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message
          });
          reject(error);
        })
    });
  },

  async getAllRefund({ commit, state, dispatch }, data) {
    commit("SET_PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.ALL_REFUND + `?page=${data.page}`)
        .then((response) => {
          commit("GET_ALL_REFUNDS", response.data.data);
          commit("SET_PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_PROGRESS", false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message,
          });
          reject(error);
        });
    });
  },

  async getAllMerchants({ commit, state, dispatch }, data) {
    commit("SET_PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(USERS.GET_MERCHANT + `?page=1`)
        .then((response) => {
          commit("GET_ALL_MERCHANTS", response.data.data);
          commit("SET_PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_PROGRESS", false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message,
          });
          reject(error);
        });
    });
  },

  async getAllTransactions({ commit, state, dispatch }, data) {
    commit("SET_PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.ALL_TRANSACTION + `?page=${data.page}`)
        .then((response) => {
          commit("GET_ALL_TRANSACTION", response.data.data);
          commit("SET_PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_PROGRESS", false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message,
          });
          reject(error);
        });
    });
  },

  async getAllWithdrawnByUser({ commit, state, dispatch }, data) {
    commit("SET_PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.ALL_WITHDRAWN_BY_USER + `?page=${data.page}&status=${data.status}`)
        .then((response) => {
          commit("GET_ALL_WITHDRAWN_BY_USER", response.data.data);
          commit("SET_PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_PROGRESS", false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message,
          });
          reject(error);
        });
    });
  },

  async getAllWithdrawn({ commit, state, dispatch }, data) {
    commit("SET_PROGRESS", true);
    return await new Promise((resolve, reject) => {
      HTTP.get(ACCOUNTS.ALL_WITHDRAWN + `?page=${data.page}&status=${data.status}`)
        .then((response) => {
          commit("GET_ALL_WITHDRAWN", response.data.data);
          commit("SET_PROGRESS", false);
          resolve(response);
        })
        .catch((error) => {
          commit("SET_PROGRESS", false);
          Vue.notify({
            group: "app",
            type: "error",
            title: error.response.message,
          });
          reject(error);
        });
    });
  },

  async refundRequest({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.post(ACCOUNTS.REQUEST_REFUND , data)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_CREATE_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Requested!",
            });
            const data = {
              page: 1
            } 
            dispatch("getAllRefund", data);
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

  async withdrawnApprove({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.post(ACCOUNTS.REQUEST_APPROVE_WITHDRAWN , data)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_CREATE_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Withdraw!",
            });
            const data = {
              page: 1,
              status: "ALL"
            } 
            dispatch("getAllWithdrawn", data);
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

  async withdrawnToMerchant({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.post(ACCOUNTS.WITHDRAW_TO_MERCHANT , data)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_CREATE_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Withdraw!",
            });
            const data = {
              page: 1,
              status: "ALL"
            } 
            dispatch("getAllWithdrawn", data);
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

  async withdrawnRequest({ commit, dispatch }, data) {
    return await new Promise((resolve, reject) => {
      commit("loaders/SET_CREATE_BTN_LOADING", true, {
        root: true,
      });
      HTTP.post(ACCOUNTS.REQUEST_WITHDRAWN , data)
        .then((response) => {
          if (response.data.success) {
            commit("loaders/SET_CREATE_BTN_LOADING", false, {
              root: true,
            });
            Vue.notify({
              group: "app",
              type: "success",
              title: "Successfully Requested!",
            });
            const data = {
              page: 1
            } 
            // dispatch("getAllWithdrawnByUser", data);
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
};
const mutations = {
  SET_ACCOUNTS_BALANCE: (state, data) => {
    state.accounts_balance = data.data
  },

  SET_TRANSACTIONS: (state, data) => {
    
    state.transactions = data.data.docs;

    state.paginations = {
      total: data.data.total,
      limit: data.data.limit,
      page: data.data.page,
      pages: data.data.pages,
    }
  },

  SET_PROGRESS: (state, data) => {
    state.progress = data;
  },

  SET_PAGE: (state, data) => {
    state.pagination.page = data;
  },

  GET_ALL_REFUNDS(state, data) {
    state.refunds = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
  },
  GET_ALL_MERCHANTS(state, data) {
    state.merchants = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
  },
  GET_ALL_TRANSACTION(state, data) {
    state.allTransactions = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
  },
  GET_ALL_WITHDRAWN_BY_USER(state, data) {
    state.allWithdrawnByUser = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
  },
  GET_ALL_WITHDRAWN(state, data) {
    state.allWithdrawn = data.docs;
    state.pagination = {
      total: data.total,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
    };
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

