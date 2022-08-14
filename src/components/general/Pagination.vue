<template>
  <div class="w-fit mx-auto flex -space-x-px">
    <button class="py-2 px-3 text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 rounded-l-lg" @click="prevPage()">
      <font-awesome-icon icon="fa-solid fa-chevron-left" />
    </button>
    <button
      v-for="i in totalPages" :key="i"
      class="py-2 px-3 border"
      :class="{
        'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700': i !== currentPage,
        'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700': i === currentPage
      }"
      @click="changePage(i)"
    >{{ i }}</button>
    <button class="py-2 px-3 text-gray-500 bg-white border hover:bg-gray-100 hover:text-gray-700 rounded-r-lg" @click="nextPage()">
      <font-awesome-icon icon="fa-solid fa-chevron-right" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(['products']),
    totalPages() {
      return Math.ceil(this.total/this.pageSize)
    }
  },
  methods: {
    ...mapActions(['updateCurrentPage']),
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1)
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1)
      }
    },
    changePage(value) {
      this.updateCurrentPage(value)
    }
  }
}
</script>