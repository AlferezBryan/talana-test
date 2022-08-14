<template>
  <div class="flex-1 p-4">
    <p class="text-xl mb-4">{{ selectedCategory ? selectedCategory.name : 'Productos' }}</p>
    <nav class="w-full mb-4">
      <ol class="list-reset flex">
        <li><a href="#" @click="updateCategory(null)" class="text-cyan-700 hover:font-semibold">Inicio</a></li>
        <template v-if="selectedCategory">
          <li><font-awesome-icon icon="fa-solid fa-chevron-right" class="mx-2" /></li>
          <li class="">{{ selectedCategory.name }}</li>
        </template>
      </ol>
    </nav>
    <div v-if="filteredProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
      <div v-for="product in paginatedProducts" :key="product.id" class="p-4">
        <ProductCard :product="product" />
      </div>
    </div>
    <div v-else class="text-center">
      No se encontraron resultados
    </div>
    <Pagination
      v-if="filteredProducts.length"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="filteredProducts.length"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import Pagination from '../general/Pagination.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { ProductCard, Pagination },
  props: {
    products: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      pageSize: 4
    }
  },
  computed: {
    ...mapGetters(['selectedCategory', 'search', 'currentPage']),
    filteredProducts() {
      return this.products
        .filter(({ category }) => { // filter products by category
          if (this.selectedCategory) {
            return category.id === this.selectedCategory.id
          } else {
            return true
          }
        })
        .filter(({ category, name }) => { // filter products/categories by search
          return (
            name.toLowerCase().includes(this.search.toLowerCase())
              || category.name.toLowerCase().includes(this.search.toLowerCase())
          )
        })
    },
    paginatedProducts() {
      return this.filteredProducts.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage)
    }
  },
  methods: {
    ...mapActions(['updateCategory']),
  }
}
</script>
