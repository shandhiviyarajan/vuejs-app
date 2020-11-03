/**
 * @module:Vuex
 * @name:Revenue Statistics
 * @author:KeenEyeSolutions - Shan Dhiviyarajan
 */


/**
 * State
 */
const state = {
    admin_stats: '',
    admin_chart: '',
    merchant_chart: '',
    merchant_income_stats: '',
    merchant_withdrawal_stats: '',
    merchant_withdrawal_stats_by_id: ''

};
/**
 * getters
*/
const getters = {

    getAdminStats: (state) => {
        return state.admin_stats;
    },
    getAdminChart: (state) => {
        return state.admin_chart_data;
    },

    getMerchantChart: (state) => {
        return state.merchant_chart_data;
    },

    getMerchantIncomeStats: (state) => {
        return state.merchant_income_stats;
    },

    getMerchantWithdrawalStats: (state) => {
        return state.merchant_withdrawal_stats;
    },

    getMerchantWithdrawalStatsById: (state) => {
        return state.merchant_withdrawal_stats_by_id;
    }

};
/**
 * actions
 */
const actions = {
    //Admin income statistics
    adminStats({ commit }) {

    },

    //Admin chart data
    adminChart({ commit }) {

    },

    //Merchant chart data
    merchantChart({ commit }) {

    },

    //Merchant income statistics
    merchantIncomeStats({ commit }) {

    },


    //Merchant withdrawal statistics
    merchantWithdrawalStats({ commit }) {

    },

    //Merchant withdrawal statistics by merchant id
    merchantWithdrawalStatsById({ commit }, data) {

    }



};

/**
 * mutations
 */
const mutations = {

    SET_ADMIN_STATS: (state, data) => {
        state.admin_stats = data;
    },

    SET_ADMIN_CHART: (state, data) => {
        state.admin_chart = data;
    },

    SET_MERCHANT_CHART: (state, data) => {
        state.merchant_chart = data;
    },

    SET_MERCHANT_INCOME_STATS: (state, data) => {
        state.merchant_income_stats = data;
    },

    SET_MERCHANT_WITHDRAWAL_STATS: (state, data) => {
        state.merchant_income_stats = data;
    },

    SET_MERCHANT_WITHDRAWAL_STATS_BY_ID:(state,data)=>{
        state.merchant_withdrawal_stats_by_id = data;
    }








};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};
