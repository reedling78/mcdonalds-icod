<template>
  <div class="home-screen">
    {{ screenName }} ......
    <dev-menu></dev-menu>
  </div>
</template>

<script>
import CoatesConfig from "@config/coates.config.js";
import DevMenu from "@devmode/DevMenu";

export default {
  name: "home-screen",
  components: { DevMenu },
  computed: {
    screenName() {
      return "Home Screen";
    }
  }
};
</script>

<style  scoped>
.home-screen {
  background-color: #ededed;
}
</style>


