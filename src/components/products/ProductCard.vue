<template>
  <div class="w-56 mx-auto">
    <div class="relative border rounded overflow-hidden mb-4">
      <div class="p-4 bg-white">
        <div class="relative w-full pb-full pt-20">
          <div class="absolute w-full h-full top-0">
            <img
              :src="product.photo"
              :alt="`product-${product.id}`"
              class="h-full w-full object-contain"
              :class="{ 'opacity-50': !product.stock }"
            >
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 px-2 py-1 bg-gray-500 text-white rounded-tr">
        {{ product.stock ? 'Disponible' : 'Fuera de stock' }}
      </div>
    </div>
    <p class="text-lg truncate" :class="{ 'text-gray-400': !product.stock }">{{ product.name }}</p>
    <p class="mb-2 text-cyan-700" :class="{ 'text-gray-400': !product.stock }">${{ product.price }}</p>
    <div class="flex h-10 border rounded overflow-hidden">
      <Counter v-model="counter" :max="product.stock" :min="1" :disabled="!product.stock" />
      <button
        class="bg-cyan-700 text-white flex-1"
        @click="product.stock ? showModal = true : null"
        :class="{
          'bg-gray-400': !product.stock,
          'cursor-default': !product.stock,
        }"
      >
        <font-awesome-icon icon="fa-solid fa-cart-plus" />
      </button>
    </div>
  </div>
  <Modal v-model="showModal" width="800px">
    <div class="border-b">
      <p class="text-lg mb-4 font-semibold">Producto Agregado</p>
    </div>
    <div class="p-4 grid grid-cols-2 gap-6">
      <div>
        <div class="relative w-full pb-full border rounded">
          <div class="absolute w-full h-full">
            <img
              :src="product.photo"
              :alt="`product-${product.id}`"
              class="h-full w-full object-contain"
            >
          </div>
        </div>
      </div>
      <div>
        <p class="text-2xl">{{ product.name }}</p>
        <p class="mb-5">{{ product.code }}</p>
        <p class="text-lg mb-3">Precio: ${{ product.price }}</p>
        <div class="flex items-center mb-3">
          <p class="text-lg mr-4">Cantidad</p>
          <Counter v-model="counter" :max="product.stock" :min="1" class="border" />
        </div>
        <p class="text-lg">Sub-total: ${{ product.price * counter }}</p>
      </div>
      <div class="col-span-2">
        <p>{{ product.abstract }}</p>
      </div>
      <button class="h-10 rounded" @click="showModal = false">Seguir Comprando</button>
      <button class="h-10 rounded bg-cyan-700 text-white" @click="addProduct">Agregar al Carro</button>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
import Counter from '../general/Counter.vue';
import Modal from '../general/Modal.vue';
export default {
  components: { Counter, Modal },
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      counter: 1,
      showModal: false,
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    addProduct() {
      this.addToCart({ product: this.product, quantity: this.counter })
      this.counter = 1
      this.showModal = false
    }
  }
}
</script>