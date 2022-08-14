<template>
  <div
    class="shadow-lg bg-white"
    :class="{ 'w-16': !showMenu, 'w-48': showMenu }"
  >
    <div
      class="fixed"
      :class="{ 'w-16': !showMenu, 'w-48': showMenu }"
    >
      <div class="flex items-center h-16 p-4">
        <p v-if="showMenu" class="flex-1 text-xl">Categorías</p>
        <button @click="showMenu = !showMenu" class="h-8 w-8">
          <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
      </div>
      <template v-if="showMenu">
        <div v-for="category in categories" :key="category.id">
          <button class="h-8 w-full flex items-center group pr-4" @click="updateCategory(category)">
            <div
              class="opacity-0 group-hover:opacity-100 h-8 w-2 mr-3 bg-cyan-700"
              :class="{
                'opacity-100': selectedCategory?.id === category.id,
              }"
            />
            <div
              class="group-hover:font-semibold"
              :class="{
                'font-semibold': selectedCategory?.id === category.id,
              }"
            >{{ category.name }}</div>
            <div
              class="opacity-0 group-hover:opacity-100 flex-1 text-right ml-2"
              :class="{
                'opacity-100': selectedCategory?.id === category.id,
              }"
            >
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </div>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    categories: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showMenu: true,
    }
  },
  computed: {
    ...mapGetters(['selectedCategory'])
  },
  methods: {
    ...mapActions(['updateCategory'])
  }
}
</script>
