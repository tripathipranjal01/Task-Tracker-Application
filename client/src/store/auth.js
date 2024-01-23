
import { createStore } from 'vuex';

const TOKEN_KEY = 'authToken';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY); 
      window.location.reload();
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
      localStorage.setItem(TOKEN_KEY, user.token);
    },
   async logout({ commit }) {
     localStorage.removeItem(TOKEN_KEY, 'token')
     commit('logout');

    },
    
    initAuth({ commit }) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        commit('setUser', { token });
      }
    },
   
  },
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
  },
  namespaced: true,
});
