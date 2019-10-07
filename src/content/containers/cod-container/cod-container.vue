<template>
  <div class="cod-container" :class="lane === currentLane ? 'cod-container--active': ''">
    <cod-cart :cartView="cartView" :products="products" :total="total.totalAmount"></cod-cart>
    <cod-confirm
      :confirmView="confirmView"
      :driveForwardView="driveForwardView"
      :products="products"
      :total="total.totalDue"
      :tax="total.totalTax"
    ></cod-confirm>
  </div>
</template>

<script>
import { CodCart, CodConfirm } from "@components";
import { createNamespacedHelpers } from "vuex";
import { setTimeout } from "timers";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers("cod");

const components = {
  "cod-cart": CodCart,
  "cod-confirm": CodConfirm
};

export default {
  name: "cod-container",
  components,
  computed: {
    ...mapState({
      cartView: state => state.cartView,
      confirmView: state => state.confirmView,
      driveForwardView: state => state.driveForwardView,
      products: state => state.items,
      total: state => state.total,
      lane: state => state.lane
    })
  },
  data: function() {
    return {
      currentLane: "cod-lane-1"
    };
  },
  methods: {
    checkLane: function() {
      if (SB.Env.has("screen-set-name")) {
        var name = SB.Env.get("screen-set-name").toLowerCase();

        if (name && name.includes("2")) {
          this.currentLane = "cod-lane-2";
        }
      }
    }
  },
  mounted: function() {
    this.$store.dispatch("cod/init");
    this.checkLane();
  }
};
</script>

<style lang="scss" scoped>
.cod-container {
  opacity: 0;
  transition-duration: 10s;
  z-index: 3;
  &--active {
    opacity: 1;
    transition-duration: 0.2s;
  }

  .cod-controls {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-around;
    z-index: 2;
    button {
      background-color: white;
    }
  }
}
</style>


