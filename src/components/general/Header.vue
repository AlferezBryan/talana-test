<template>
  <div class="fixed w-full h-20 flex z-10 shadow bg-white">
    <div class="w-48 flex items-center p-4">
      <img src="@/assets/img/logo.jpg" alt="logo" class="h-full w-full object-contain">
    </div>
    <div class="relative flex-1 p-4 flex items-center justify-end">
      <div class="flex items-center relative">
        <div class="hidden md:flex relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass text-cyan-700" class="text-cyan-700" />
          </div>
          <input
            type="text"
            :value="search"
            @input="handleInputSearch"
            class="border w-96 h-10 pl-12 rounded-full"
            placeholder="Buscador de productos y categorías"
          >
        </div>
        <button id="dropdown-cart-button" class="h-10 w-10 ml-4 relative" @click="showDropdown = !showDropdown">
          <font-awesome-icon icon="fa-solid fa-bag-shopping" class="text-3xl text-cyan-700" />
          <div class="absolute bg-red-600 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center right-0 bottom-0">
            {{ quantityCart }}
          </div>
        </button>
      </div>
    </div>
    <transition name="dropdown-cart">
      <div v-if="showDropdown" id="dropdown-cart" class="absolute right-0 top-20 w-116 h-80 shadow bg-white p-4 rounded z-20">
        <div class="h-full flex flex-col">
          <p class="mb-4 font-semibold">Resumen de compra</p>
          <div class="flex-1 overflow-auto mb-4">
            <template v-if="cart.length">
              <div v-for="element in cart" :key="element.product.id" class="flex items-center justify-between mb-2">
                <div class="w-40">
                  <p class="truncate">{{ element.product.name }}</p>
                  <p class="text-sm">Precio: ${{ element.product.price }}</p>
                </div>
                <div class="w-60 flex items-center justify-between ml-4">
                  <Counter
                    class="h-10 w-24 border rounded"
                    :model-value="element.quantity"
                    :min="0"
                    :max="element.product.stock"
                    @increase="addOneToCart(element.product)"
                    @decrease="removeOneFromCart(element.product)"
                  />
                  <p class="text-right mx-2">Subtotal: ${{ element.product.price * element.quantity }}</p>
                </div>
              </div>
            </template>
            <div v-else class="w-full h-full flex items-center justify-center">Carrito vacío</div>
          </div>
          <div class="flex">
            <div class="w-40 text-right">
              <p class="font-semibold">Subtotal:</p>
            </div>
            <div class="flex-1 text-right">
              <p class="font-semibold">${{ subTotalCart }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Counter from './Counter.vue';
export default {
  components: { Counter },
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters(['search', 'cart']),
    quantityCart() {
      if (!this.cart.length) return 0
      return this.cart.reduce((a, b) => (a + b.quantity), 0)
    },
    subTotalCart() {
      if (!this.cart.length) return 0
      return this.cart.reduce((a, b) => (a + b.product.price * b.quantity), 0)
    },
  },
  created() {
    window.addEventListener('click', this.outsideClickListener)
  },
  destroyed() {
    window.removeEventListener('click', this.outsideClickListener)
  },
  methods: {
    ...mapActions(['updateSearch', 'addOneToCart', 'removeOneFromCart']),
    handleInputSearch({ target }) {
        this.updateSearch(target.value);
    },
    outsideClickListener({ target }) {
      const dropdownCart = document.getElementById('dropdown-cart')
      const dropdownCartButton = document.getElementById('dropdown-cart-button')
      if (dropdownCart && !dropdownCart.contains(target) && !dropdownCartButton.contains(target)) {
        this.showDropdown = false
      }
    }
  },
}
</script>


<style>
.dropdown-cart-enter-active,
.dropdown-cart-leave-active {
  transition: all .5s ease;
}
.dropdown-cart-enter-from,
.dropdown-cart-leave-to {
  opacity: 0;
}
</style>