import Vue from 'vue'
import Vuex from "vuex"
import types from './mutation-types'
Vue.use(Vuex);

const state = {
    isAuthenticated: false,
    userInfo: ''
}

const mutations = {
    [types.SET_AUTHENTICATED](state, payload) {
        localStorage.setItem('isAuthenticated', payload);
        state.isAuthenticated = payload;
    },
    [types.SET_ADMIM](state, payload) {
        state.userInfo = payload;
    },
    [types.CLEAR_ALL](state) {
        state.isAuthenticated = false;
        state.userInfo = '';
        localStorage.removeItem('isAuthenticated');
    }
}
const actions = {
    set_authenticated({ commit }, payload) {
        commit(types.SET_AUTHENTICATED, payload);
    },
    set_admin({ commit }, payload) {
        commit(types.SET_ADMIM, payload);
    },
    clear_all({ commit }) {
        commit(types.CLEAR_ALL);
    }
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})
export default store