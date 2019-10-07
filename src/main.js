import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "@/styles/index.scss";
require("@/assets/libs/sb.all.min.js");

import CoatesConfig from "@config/coates.config.js";
Vue.config.productionTip = false;

(async function bootstrapSB() {
	await SB.setup(CoatesConfig.SB);

	if (
		process.env.NODE_ENV === "development" &&
		CoatesConfig.SB.environmentData
	) {
		window["Switchboard"] = {
			...window["Switchboard"],
			environmentData: {
				...window["Switchboard"].environmentData,
				...CoatesConfig.SB.environmentData
			}
		};
	}

	/* eslint-disable no-new */
	new Vue({
		el: "#app",
		store,
		router,
		render: h => h(App)
	});
})();
