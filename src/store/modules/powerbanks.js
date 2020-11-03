/**
 * @module:Vuex
 * @name:Power Banks
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */
import Vue from "vue";
import { AXIOS, HTTP, APP_URL, CREATEHTTP } from "@/plugins/api";
import { POWERBANKS } from "@/services/constants";


const state = {
    ongoing_powerbanks: [],
    progress: false,
    pagination: {
        total: "",
        limit: "",
        page: 1,
        pages: "",
    },
};

const getters = {
    get_ongoing_powerbanks: (state) => {
        return state.ongoing_powerbanks;
    },
    paginations: (state) => {
        return state.pagination;
    },

    progress: (state) => {
        return state.progress;
    }
};
const actions = {
    async allOngoingPowerBanks({ commit, state, dispatch }, data) {
        commit('SET_PROGRESS', true);
        return await new Promise((resolve, reject) => {
            HTTP.get(POWERBANKS.ONGOING(data.page))
                .then((response) => {
                    commit('SET_ONGOING_POWERBANKS', response.data);
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
};
const mutations = {
    SET_ONGOING_POWERBANKS: (state, data) => {
        state.ongoing_powerbanks = data.data.docs;
        state.pagination = {
            total: data.total,
            limit: data.limit,
            page: data.page,
            pages: data.pages,
        };
    },

    SET_PROGRESS: (state, data) => {
        state.progress = data;
    }
};
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};

