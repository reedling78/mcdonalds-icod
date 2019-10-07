<template>
  <div class="developer-menu" v-if="isDev">
    <h4>Dev Menu</h4>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li :key="screen.id" v-for="screen in screens">
        <router-link :to="screen.url.replace('#/', '/')">{{screen.url.replace('#/', '')}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import screens from "@config/screens.config";

export default {
  name: "DevMenu",
  data() {
    return screens;
  },
  computed: {
    isDev() {
      return process.env.NODE_ENV === "development";
    }
  }
};
</script>

<style lang="scss" scoped>
.developer-menu {
  position: fixed;
  width: auto;
  height: auto;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: #ececec;
  z-index: 9999999;
  &:hover a {
    font-size: 50px;
  }
  a {
    font-size: 10px;
    transition: all 0.1s;
  }
}
</style>


