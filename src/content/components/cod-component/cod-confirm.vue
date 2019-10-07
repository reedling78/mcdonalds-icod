<template>
  <div class="cod__confirm" :class="confirmView">
    <div class="cod__header">
      <div class="header__image">
        <img src="@/assets/img/mcbag.png">
      </div>

      <div class="header__title">Confirma Su Orden</div>
    </div>

    <div ref="codContent" class="cod__content">
      <div class="content__wrapper">
        <div class="cod__summary">
          Your Order
          <span class="summary__count">({{ amountOfProducts }})</span>
        </div>

        <ul
          ref="codProducts"
          class="cod__products"
          :class="[isLargeOrder, reduceFontSize, removeDetailClass]"
        >
          <cod-product
            :removeDetails="removeDetails"
            :key="i"
            :product="product"
            v-for="(product, i) in filteredProducts"
          ></cod-product>
        </ul>
      </div>
    </div>

    <div class="cod__footer">
      <div class="drive__forward" :class="driveForwardView ? 'drive__forward--active' : ''">
        <p>Thanks for your order! Please proceed to the next window.</p>
        <div ref="forwardArrows" class="drive__forward--arrows">
          <animated-arrows></animated-arrows>
        </div>
      </div>

      <div class="total__area">
        <!-- <div data-v-420850ba="" class="total__tax">TOTAL 6% Service Tax: {{tax ? parseFloat(tax).toFixed(2) : ''}}</div> -->
        <!-- <div data-v-420850ba class="total__tax">Tax: {{tax ? parseFloat(tax).toFixed(2) : ''}}</div> -->
        <div class="total__title">Total:</div>
        <div class="total__amount">Q{{total ? parseFloat(total).toFixed(2) : ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import codProduct from "./cod-product";
import AnimatedArrows from "./animated-arrows";
export default {
  name: "cod-confirm",
  props: ["confirmView", "driveForwardView", "products", "total", "tax"],
  components: {
    "cod-product": codProduct,
    "animated-arrows": AnimatedArrows
  },
  data() {
    return {
      columnView: false,
      amountOfProducts: "",
      removeDetails: false,
      removeDetailClass: "",
      reduceFontSize: "",

      // filter all active products, removes cancelled products
      filteredProducts: []
    };
  },
  computed: {
    isLargeOrder() {
      return this.products.length > 10 && this.columnView
        ? "cod__products--large-order"
        : "";
    }
  },
  watch: {
    products: {
      handler() {
        this.filteredProducts = this.products.filter(p => p.quantity);
        this.elementHeight(this.$refs);
        const productsTotaled = this.filteredProducts.reduce(
          (acc, product) => (acc += product.quantity),
          0
        );
        this.amountOfProducts =
          productsTotaled == 1
            ? `${productsTotaled} item`
            : `${productsTotaled} items`;
      }
    },
    confirmView: {
      handler() {
        if (this.$el.classList.contains("cod__confirm--active")) {
          this.removeDetails = false;
          this.removeDetailClass = "";
          this.reduceFontSize = "";
        }

        // removes "removeDetailsClass" on all instances of once confirmed view
        if (!this.$el.classList.contains("cod__confirm--active")) {
          this.removeDetails = false;
          this.removeDetailClass = "";
          this.reduceFontSize = "";
        }
      }
    }
  },
  methods: {
    elementHeight(element) {
      let totalElementHeight = 0;

      let codProductsChildren = Array.from(this.$refs.codProducts.childNodes);

      codProductsChildren.forEach(function(element) {
        totalElementHeight =
          totalElementHeight + parseInt(element.getBoundingClientRect().height);
      });

      if (
        !this.$refs.codProducts.classList.contains("cod__products--large-order")
      ) {
        this.columnView = totalElementHeight >= 800 ? true : false;
      }

      // checks for if details are removed and if totalElementHeight no longer meets the height then columnView is removed
      if (
        this.$refs.codProducts.classList.contains(
          "cod__products--remove-detail"
        ) &&
        totalElementHeight <
          this.$refs.codProducts.getBoundingClientRect().height
      ) {
        this.columnView = false;
      }

      if (
        this.columnView &&
        !this.$refs.codProducts.classList.contains(
          "cod__products--remove-detail"
        )
      ) {
        this.removeDetails = totalElementHeight >= 1550 ? true : false;
        this.removeDetailClass =
          totalElementHeight >= 1550 ? "cod__products--remove-detail" : "";
      }

      if (
        this.removeDetails &&
        this.removeDetailClass !== "" &&
        !this.$refs.codProducts.classList.contains(
          "cod__products--reduced-font"
        )
      ) {
        this.reduceFontSize =
          totalElementHeight >= 1400 && this.products.length > 30
            ? "cod__products--reduced-font"
            : "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cod__confirm {
  font-family: "Speedee Extra Bold";
  z-index: 2;
  @include box(1080px, 1920px);
  @include absolute(bottom -1920px left 0);
  transition: bottom 0.7s ease-in-out;
  color: $darkerGrey;
  display: flex;
  flex-direction: column;
  background-color: #ededed;

  &--active {
    /* Show the cart or confirmation screen based on its height */
    @include absolute(bottom 0 left 0);
    *,
    .cod-product .product_name .product-name__label {
      color: #222 !important;
    }
  }

  .cod__header {
    width: 100%;
    height: 350px;
    padding: 50px;
    display: flex;

    .header__image {
      width: 180px;
      padding-top: 8px;

      img {
        width: 100%;
      }
    }

    .header__title {
      font-family: "Speedee Extra Bold";
      color: $darkerGrey;
      padding-top: 66px;
      margin-left: 72px;
      font-size: 58px;
      letter-spacing: 1px;
    }
  }

  .cod__content {
    width: 100%;
    position: relative;
    flex-grow: 1;

    .cod__summary {
      h1 {
        display: inline-block;
        font-family: "Speedee Extra Bold";
        color: $darkerGrey;
      }
    }

    .content__wrapper {
      position: absolute;
      // bottom: 110px;
      width: 100%;
      padding-right: 35px;

      .cod__summary {
        font-size: 90px;
        padding-left: 50px;
        font-family: "Speedee Extra Bold";
        color: $darkerGrey;

        .summary__count {
          font-size: 35px;
          font-family: "Speedee Regular";
          margin-left: -10px;
        }
      }

      .cod__products {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        overflow: hidden;

        .cod-product {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;
          padding-left: 50px;

          .product-qty {
            width: 30px;
          }

          .product-name {
            flex-grow: 1;
            width: 400px;
            padding-right: 50px;
            font-size: 30px;
            font-family: "Speedee Regular";
            .product-name__label {
              color: #222 !important;
            }
          }

          .product-price {
            width: 50px;
          }

          .product-qty,
          .product-name,
          .product-price {
            font-size: 30px;
          }

          .products-details {
            width: 85%;
            flex-grow: 1;
            margin-left: 30px;

            .product-detail {
              color: #616161;
            }
          }
        }

        &--large-order {
          height: 1100px;

          .cod-product {
            width: 518px;
          }
        }
      }
    }
  }

  .cod__footer {
    display: flex;
    width: 100%;
    // height: 150px;
    padding: 30px 50px;
    font-size: 70px;
    font-family: "Speedee Extra Bold";
    color: $darkerGrey;
    background-color: #ffce00;
    transition: height 0.5s linear;

    .drive__forward {
      flex-grow: 1;
      font-size: 30px;
      font-weight: 500;
      opacity: 0;

      &--arrows {
        width: 600px;
        position: absolute;
        left: -95px;
        margin-top: 27px;
      }

      &--active {
        opacity: 1;
        transition-duration: 1s;
      }
    }

    .total__area {
      width: 360px;
      text-align: right;
      .total__tax {
        position: relative;
        width: 600px;
        left: -67%;
        font-size: 30px;
      }
      .total__title {
        font-size: 50px;
        display: inline;
      }

      .total__amount {
        font-size: 50px;
        display: inline;
      }
    }
  }
}
</style>

