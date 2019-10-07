<template>
  <div class="cod__cart" :class="cartView">
    <div class="cod__content">
      <div class="cod__summary">
        Su Orden
        <span>({{ pages.length }} of {{ pages.length }})</span>
      </div>
      <div class="encanta__image">
        <img src="@/assets/img/me-encata.jpg">
      </div>
      <ul class="cod__products" ref="codVisibleProducts">
        <cod-product :key="i" :product="product" v-for="(product, i) in lastPage.products"></cod-product>
      </ul>

      <ul class="cod__products cod__products--hidden">
        <cod-product
          :key="i"
          :product="product"
          v-for="(product, i) in products"
          :ref="product.code"
        ></cod-product>
      </ul>
    </div>

    <div class="cod__footer">Total: Q{{total ? parseFloat(total).toFixed(2) : ''}}</div>
  </div>
</template>

<script>
import codProduct from "./cod-product";
import { setTimeout } from "timers";

export default {
  name: "cod-cart",
  props: ["cartView", "products", "total"],
  components: {
    "cod-product": codProduct
  },
  data() {
    return {
      pages: [],
      lastPage: {}
    };
  },
  mounted() {
    console.log("cod-cart created");
  },
  watch: {
    products: {
      immediate: true,
      handler(nv, ov) {
        setTimeout(() => {
          const productSizes = this.getProductsSize(this.products, this.$refs);
          this.computePages(productSizes);
        }, 0);
      }
    }
  },
  methods: {
    getProductsSize(products, htmlNodes) {
      return products.slice().map(item => {
        let itemDom = htmlNodes[item.code][0].$el;
        return { height: itemDom.offsetHeight, item: item };
      });
    },

    computePages(productSizes) {
      let pages = [],
        newPage = { id: 0, products: [] },
        totalCounter = 0,
        maxPageSize = this.$refs.codVisibleProducts.offsetHeight;

      pages.push(newPage);

      productSizes.forEach(itemSize => {
        itemSize.height = itemSize.height + 20;
        if (totalCounter + itemSize.height >= maxPageSize) {
          newPage = { id: ++newPage.id, products: [] };
          pages.push(newPage);
          totalCounter = 0;
        }

        newPage.products.push(itemSize.item);
        totalCounter += itemSize.height;
      });

      this.pages = pages;
      this.lastPage = pages[pages.length - 1];
    }
  }
};
</script>

<style lang="scss" scoped>
.cod__cart {
  z-index: 1;
  @include box(1080px, 392px);
  @include absolute(bottom -392px left 0);
  transition: bottom 0.5s ease-in-out;

  display: flex;
  flex-direction: column;
  background-color: #222;

  &--active {
    /* Show the cart or confirmation screen based on its height */
    @include absolute(bottom 0 left 0);
  }

  .cod__content {
    width: 100%;
    height: 392px;
    padding: 20px 30px 20px 30px;
    .encanta__image {
      @include absolute(top 0 right 0);
      background: #dd3731;
      height: 392px;
    }
    .cod__summary {
      font-size: 60px;
      font-family: "Speedee Extra Bold";
      color: #fff;

      span {
        font-family: "Speedee Regular";
        font-size: 37px;
        margin-left: 10px;
      }
    }

    .cod__products {
      height: 300px;
      padding-top: 28px;
      overflow: hidden;
      position: relative;
      width: 630px;
      &--hidden {
        position: absolute;
        top: 110px;
        width: 980px;
        visibility: hidden;
      }
    }
  }

  .cod__footer {
    width: 100%;
    height: 120px;
    padding: 30px 50px;
    font-size: 60px;
    font-family: "Speedee Extra Bold";
    background-color: #ffce00;
    transition: height 0.5s linear;
    text-align: right;
  }
}
</style>
