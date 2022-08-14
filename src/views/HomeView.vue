<template>
  <div class="flex min-h-screen pt-20 bg-gray-100">
    <Categories :categories="categories" />
    <ProductsGrid :products="products" />
  </div>
</template>

<script>
import { getProducts, getProductCategories } from '../api';
import Categories from '../components/products/Categories.vue';
import ProductsGrid from '../components/products/ProductsGrid.vue';
export default {
  components: { Categories, ProductsGrid },
  data() {
    return {
      categories: [],
      products: [],
    }
  },
  async mounted() {
    this.requestCategories()
    this.requestProducts()
  },
  methods: {
    async requestCategories() {
      const response = await getProductCategories()
      if (response.data) {
        this.categories = response.data
      }
    },
    async requestProducts() {
      const response = await getProducts()
      if (response.data) {
        this.products = response.data
      }
    },
  }
}
</script>

<style>
</style>
