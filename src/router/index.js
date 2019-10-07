import Vue from "vue";
import Router from "vue-router";
import HomeScreen from "@devmode/HomeScreen";
import Routes from "./Routes";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "home-screen",
			component: HomeScreen
		},
		...Routes
	]
});
