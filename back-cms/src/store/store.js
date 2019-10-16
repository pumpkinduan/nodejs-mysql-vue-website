import Vue from 'vue'
import Vuex from "vuex"
import types from './mutation-types'
Vue.use(Vuex);

const state = {
    isAuthenticated: false,
    admin: ''
}

const mutations = {
    [types.SET_AUTHENTICATED](state, payload) {
        console.log(payload)
        state.isAuthenticated = payload;
    },
    [types.SET_ADMIM](state, payload) {
        state.admin = payload;
    }   
}
const actions = {
    set_authenticated({commit}, payload) {
        commit(types.SET_AUTHENTICATED, payload);
    },
    set_admin({commit}, payload) {
        commit(types.SET_ADMIM, payload);
    }       
}
const store = new Vuex.Store({
    state,
    mutations,
    actions
})
export default store