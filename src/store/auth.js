// store/auth.js

export default {
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
        },
        login({ commit }, data) {
        localStorage.setItem("token", data.token);

        commit("SET_AUTHENTICATED", true);
        commit("SET_USER_DATA", data.user_data);
        },
        logout({ commit }) {
        localStorage.removeItem("token");
        commit("SET_AUTHENTICATED", false);
        commit("SET_USER_DATA", null);
        },
    },
};
