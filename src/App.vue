<template>
  <div id="app">
    <router-view/>
    <dev-menu></dev-menu>
  </div>
</template>

<script>
import Router from "vue-router";
import DevMenu from "@devmode/DevMenu";

export default {
  name: "App",
  components: { DevMenu }
};
</script>

<style>
#app {
  background-color: #ededed;
}
</style>
