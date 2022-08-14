<template>
  <transition name="modal-fade">
    <div v-if="modelValue" class="modal-fade fixed bg-black w-screen h-screen top-0 left-0 z-20" @click="closeModal()" />
  </transition>
  <transition name="modal-body">
    <div v-if="modelValue" class="modal-body fixed bg-white top-1/2 left-1/2 z-20 rounded-lg p-4" :style="`width: ${ width }`">
      <div
        class="absolute top-4 right-4 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
        @click="closeModal()"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" class="" />
      </div>
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '800px',
    }
  },
  watch: {
    modelValue(value) {
      const body = document.querySelector('body')
      if (value) body.style.overflow = 'hidden'
      else body.style.overflow = 'auto'
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<style>
.modal-fade {
  opacity: .4;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all .5s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-body {
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 2rem);
  transform: translate(-50%, -50%);
}
.modal-body-enter-active,
.modal-body-leave-active {
  transition: all .5s ease;
}
.modal-body-enter-from,
.modal-body-leave-to {
  opacity: 0;
  transform: translate(-50%, -40%);
}
</style>