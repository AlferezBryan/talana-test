<template>
  <div class="flex w-24 items-center bg-white" :class="{ 'text-gray-400': disabled }">
    <button
      class="flex-1"
      :class="{ 'cursor-default': disabled, 'text-gray-400': modelValue <= min }"
      @click="handleDecrease"
    >
      <font-awesome-icon icon="fa-solid fa-minus" class="text-xs" />
    </button>
    <div class="flex-1 text-center">{{ modelValue }}</div>
    <button
      class="flex-1"
      :class="{ 'cursor-default': disabled, 'text-gray-400': modelValue >= max }"
      @click="handleIncrease"
    >
      <font-awesome-icon icon="fa-solid fa-plus" class="text-xs" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },
  methods: {
    handleDecrease() {
      if (this.disabled) return
      if (this.modelValue <= this.min) return
      this.$emit('update:modelValue', this.modelValue - 1)
      this.$emit('decrease')
    },
    handleIncrease() {
      if (this.disabled) return
      if (this.modelValue >= this.max) return
      this.$emit('update:modelValue', this.modelValue + 1)
      this.$emit('increase')
    }
  }
}
</script>