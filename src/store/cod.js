import lmsConnect from "lms-connect";

import config from "@config/coates.config";

const state = {
	cartView: "",
	confirmView: "",
	driveForwardView: false,
	items: [],
	lane: "",
	total: {}
};

const getters = {};

const actions = {
	init({ dispatch }) {
		lmsConnect.setup(config.LMS.ip);

		lmsConnect.cod.onComplete(dispatch.bind(null, "posComplete"));

		console.log('lmsConnect :', lmsConnect);

		lmsConnect.cod.subscribe(item => {
			if (item.Product && item.Product.length) {
				item.Product.forEach(p => {
					if (p.hasOwnProperty("Grill")) {
						p.Grill.forEach(g => {
							if (g.$.modifier === "0" && parseFloat(g.$.totalPrice) > 0) {
								g.$.modifier = "3";
							}
						});
					}
				});
			}

			if (
				item.Product &&
				item.Product.length &&
				item.Product[0].hasOwnProperty("Product")
			) {
				item.Product[0].Product.map(item => delete item.ReferencePrice);

				item.Product[0].Product.forEach(p => {
					if (p.hasOwnProperty("Grill")) {
						p.Grill.forEach(g => {
							if (g.$.modifier === "0" && parseFloat(g.$.totalPrice) > 0) {
								g.$.modifier = "3";
							}
						});
					}
				});
			}

			return item;
		});

		lmsConnect.cod.onUpdate(dispatch.bind(null, "addProducts"));
		lmsConnect.cod.onConfirm(dispatch.bind(null, "posConfirm"));
	},

	setView({ commit }, view) {
		commit(view);
	},

	addProducts({ commit, dispatch }, data) {
		if (data.items.length) {
			dispatch("setView", "startOrder");
		}

		commit("addProducts", data);
	},

	posConfirm({ dispatch }) {
		dispatch("setView", "confirmOrder");
	},

	posComplete({ commit, dispatch }) {
		dispatch("setView", "completeOrder");

		// has to be run before reset of COD data
		setTimeout(() => {
			commit("resetCODView");
		}, 3500);

		setTimeout(() => {
			commit("resetCod");
		}, 4000);
	}
};

const mutations = {
	startOrder(state) {
		state.cartView = "cod__cart--active";
		state.confirmView = "";
	},

	addProducts(state, product) {
		console.info("product", product);
		state.items = [...product.items];
		state.total = product.totalPrice;
		state.lane = product.lane;
	},

	confirmOrder(state) {
		state.confirmView = "cod__confirm--active";
	},

	completeOrder(state) {
		state.driveForwardView = true;
	},

	// runs cod removal animation before cod is actually refreshed
	resetCODView(state) {
		state.confirmView = "";
		state.cartView = "";
	},

	resetCod() {
		// For each keys of the state
		// object reseting to its correct state type
		Object.keys(state).forEach(key => {
			if (Array.isArray(state[key])) {
				state[key] = [];
			} else {
				switch (typeof state[key]) {
					case "object":
						state[key] = {};
						break;

					case "boolean":
						state[key] = false;
						break;

					default:
						state[key] = "";
						break;
				}
			}
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
