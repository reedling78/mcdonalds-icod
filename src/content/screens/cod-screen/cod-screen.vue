<template>
  <div class="cod-screen screen-type--dt">
    <CodContainer/>
  </div>
</template>

<script>
import { CodContainer } from "@containers";
require("@/assets/libs/sb.all.min.js");
require("@/assets/libs/jquery.min.js");

export default {
  name: "cod-screen",
  components: {
    CodContainer
  },
  data() {
    return {};
  },
  methods: {
    isLocal: function() {
      return SB.local
        ? "https://gt.mcd.switchboardcms.com/file/productos-auto/"
        : "/file/productos-auto/";
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.cod-screen {
  @include box(1080px, 1920px);
  @include relative();
  display: flex;
  flex-direction: column;
  .carousel-header {
    @include absolute(top 0 left 0);
  }
  .carousel-footer {
    @include absolute(bottom 0 left 0);
  }
  .carousel-item {
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
}
</style>
