<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },
  size: {
    type: String,
    required: false,
    default: "regular",
  },
  type: {
    type: String,
    required: false,
    default: "dark"
  }
});
</script>
<template>
  <button
    class="rounded font-LatoWebSemibold leading-1.5 hover:bg-134f5c hover:border-134f5c"
    :class="[
      size === 'small' ? 'py-2 px-4 text-14px' : 'py-4 lg:px-6 px-4 text-16px',
      type === 'light' ? 'bg-white border-3d9f95 border-2 text-3d9f95 hover:text-white': 'text-white shadow-button bg-3d9f95',
    ]"
  >
    {{ label }}
  </button>
</template>
