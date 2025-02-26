// store/auth.js

export default {
  namespaced: true,
  state: {
    isAuthenticated: !!localStorage.getItem("token"), // Ensuring boolean
    userData: null,
  },
  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    },
    SET_USER_DATA(state, value) {
      state.userData = value;
    },
  },
  actions: {
    setUserData({ commit }, userData) {
      commit("SET_USER_DATA", userData);
      console.log("User data set in store");
    },
    login({ commit, state }, data) {
      localStorage.setItem("token", data.token);
      commit("SET_AUTHENTICATED", true);
      commit("SET_USER_DATA", data.user_data);

      // Access isAuthenticated from the state passed as part of the context
      console.log(state.isAuthenticated); // This will correctly log the value
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      commit("SET_AUTHENTICATED", false);
      commit("SET_USER_DATA", null);
    },
  },
};
