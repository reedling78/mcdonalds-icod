import Vue from "vue";
import Vuex from "vuex";

import cod from "./cod";

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	modules: {
		cod
	}
});
