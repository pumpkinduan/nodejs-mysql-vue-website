import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex);

const state = {
    showLoading: true
}

const mutations = {
    ['CHANGE_LOADING'](state, payload) {
        state.showLoading = payload;
    },
}
const actions = {
    change_loading({ commit }, payload) {
        commit('CHANGE_LOADING', payload);
    }
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})
export default store