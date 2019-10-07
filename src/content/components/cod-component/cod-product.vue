<template>
  <li class="cod-product">
    <span class="product-qty" :class="!product.quantity ? 'hide' : ''">{{ product.quantity }}</span>
    <span class="product-name">
      <span
        class="product-name__label"
        :class="isProductSelected ? 'product-name__label--active' : ''"
      >
        {{ product.name }}
        <span
          :class="!product.quantity ? 'product-name__label__cross-out' : ''"
        >&nbsp;</span>
      </span>
    </span>
    <span class="product-price" :class="!product.quantity ? 'hide' : ''">{{ product.price }}</span>

    <div class="cod-details" v-if="product.extras.length">
      <ul :key="i" v-for="(prod, i) in product.extras">
        <li ref="codDetail" :class="['cod-detail', largeOrder]">
          {{ prod.modifiedQty }}
          {{ prod.name }}
          <span
            class="cod-detail--sub-product-price"
            v-if="parseFloat(prod.price) > 0"
          >+ {{ parseFloat(prod.price).toFixed(2) }}</span>
        </li>
      </ul>
    </div>

    <div class="cod-details" v-if="product.subProduct.length">
      <ul :key="i" v-for="(prod, i) in product.subProduct">
        <li ref="codDetail" :class="['cod-detail', largeOrder]">
          <div>
            <span v-if="parseInt(prod.quantity) > 1">{{ prod.quantity }}x</span>
            {{ prod.name }}
            <span
              class="cod-detail--sub-product-price"
              v-if="parseFloat(prod.price) > 0"
            >+ {{ parseFloat(prod.price).toFixed(2) }}</span>
          </div>

          <div class="cod-details" v-if="prod.extra">
            <div v-for="(extra, ei) in prod.extra" :key="ei">
              <span>{{extra.modifiedQty}}</span>
              <span>{{extra.name}}</span>
              <span
                class="cod-detail--sub-product-price"
                v-if="parseFloat(extra.price) > 0"
              >+ {{ parseFloat(extra.price).toFixed(2) }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: ["product", "removeDetails"],
  data() {
    return {
      largeOrder: ""
    };
  },
  computed: {
    isProductSelected() {
      return this.product.selected && this.product.quantity;
    }
  },
  watch: {
    removeDetails: {
      handler() {
        if (this.$refs.codDetail && this.removeDetails) {
          this.largeOrder = "cod-detail--large-order";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// animation
@keyframes _fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes _cross-out {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.cod-product {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
  position: relative;
  font-family: "Lovin Sans Medium";
  color: #fff;

  .hide {
    opacity: 0;
    animation: _fade 0.1s reverse;
  }

  .product-qty {
    padding-left: 5px;
    width: 35px;
    font-family: "Speedee Extra Bold";
  }

  .product-name {
    flex-grow: 1;
    font-weight: 500;
    letter-spacing: 0.1px;

    &__label {
      position: relative;
      font-family: "Speedee Extra Bold";
      color: #fff;

      &__cross-out {
        background-color: black;
        height: 2px;
        position: absolute;
        left: 0;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        animation: _cross-out 0.25s linear;
      }
    }
  }

  .product-price {
    width: 100px;
    font-family: "Speedee Extra Bold";
    font-size: 35px;
    letter-spacing: -1.2px;
    text-align: right;
  }

  .product-qty,
  .product-name {
    font-size: 35px;
    padding-bottom: 10px;
  }

  .cod-details {
    width: 85%;
    margin-left: 35px;
    font-family: "Speedee Regular";

    .cod-detail {
      font-size: 25px;
      color: #616161;

      &--sub-product-price {
        position: absolute;
        right: 0;
      }
    }
  }
}

// smallest font for largest order
.cod__products--large-order {
  &.cod__products--reduced-font {
    .cod-product {
      .product-qty,
      .product-name,
      .product-price {
        font-size: 19px;
      }

      .cod-details {
        .cod-detail {
          font-size: 15px;
          display: none;
        }
      }
    }
  }

  // must always have detailed removed if left column is removed
  &.cod__products--remove-detail {
    .cod-product {
      .cod-details {
        .cod-detail {
          display: none;
        }
      }
    }
  }
}

// target cart view only and create the selected yellow higlighter on the product name
.cod__cart--active {
  .cod__content {
    .cod-product {
      .cod-detail {
        color: #fff;
      }
      .product-qty {
        font-family: "Speedee Extra Bold";
        color: #fff;
        padding-left: 5px;
      }
      .product-name .product-name__label {
        font-family: "Speedee Extra Bold";
        color: #fff;

        &--active {
          &::before {
            //add select state for active product
          }
        }
      }
    }
  }
}

// stop overflowing of price in COD confirm
.cod__confirm--active {
  .cod__content {
    .cod-product {
      * {
        color: #222 !important;
      }
      .product-price {
        width: 90px;
      }

      .cod-details {
        .cod-detail {
          &--sub-product-price {
            right: 0;
          }
        }
      }
    }
    .cod__products--large-order {
      .cod-product {
        span.product-name {
          max-width: 340px;
          * {
            color: #222 !important;
          }
        }
      }
    }
  }
}
</style>


