import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedCategory: null,
    search: '',
    currentPage: 1,
    cart: [],
  },
  mutations: {
    UPDATE_CATEGORY(state, payload) {
      state.selectedCategory = payload
      state.currentPage = 1
    },
    UPDATE_SEARCH(state, payload) {
      state.search = payload
      state.currentPage = 1
    },
    UPDATE_CURRENT_PAGE(state, payload) {
      state.currentPage = payload
    },
    ADD_TO_CART(state, payload) {
      const indexCart = state.cart.findIndex(({ product }) => product.id === payload.product.id)
      if (indexCart >= 0) {
        if (state.cart[indexCart].product.stock > state.cart[indexCart].quantity + payload.quantity) {
          state.cart[indexCart].quantity = state.cart[indexCart].quantity + payload.quantity
        } else {
          state.cart[indexCart].quantity = state.cart[indexCart].product.stock
        }
      } else {
        state.cart = [...state.cart, payload]
      }
    },
    ADD_ONE_TO_CART(state, payload) {
      const indexCart = state.cart.findIndex(({ product }) => product.id === payload.id)
      if (state.cart[indexCart].product.stock > state.cart[indexCart].quantity) {
        state.cart[indexCart].quantity = state.cart[indexCart].quantity + 1
      }
    },
    REMOVE_ONE_FROM_CART(state, payload) {
      const indexCart = state.cart.findIndex(({ product }) => product.id === payload.id)
      if (state.cart[indexCart].quantity > 1) {
        state.cart[indexCart].quantity = state.cart[indexCart].quantity - 1
      } else {
        state.cart.splice(indexCart, 1)
      }
    },
  },
  actions: {
    updateCategory(context, payload) {
      context.commit('UPDATE_CATEGORY', payload)
    },
    updateSearch(context, payload) {
      context.commit('UPDATE_SEARCH', payload)
    },
    updateCurrentPage(context, payload) {
      context.commit('UPDATE_CURRENT_PAGE', payload)
    },
    addToCart(context, payload) {
      context.commit('ADD_TO_CART', payload)
    },
    addOneToCart(context, payload) {
      context.commit('ADD_ONE_TO_CART', payload)
    },
    removeOneFromCart(context, payload) {
      context.commit('REMOVE_ONE_FROM_CART', payload)
    },
  },
  getters: {
    selectedCategory: state => state.selectedCategory,
    cart: state => state.cart,
    search: state => state.search,
    currentPage: state => state.currentPage,
  }
})
