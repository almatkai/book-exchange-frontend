// store/index.js
import Vuex from "vuex";
import auth from "./auth";

export default new Vuex.Store({
    modules: {
        auth: auth,
    },
});
