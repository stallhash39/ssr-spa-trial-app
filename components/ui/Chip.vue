<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: "",
  },
  color: {
    type: String,
    required: false,
    default: "",
  },
});

const statusClass = computed(() => {
  if (props.isActive) {
    return 'bg-' + props.color;
  }
  return 'bg-d9e8ee';
});

const labelClass = computed(() => {
  if (props.isActive) {
    return 'text-' + props.color;
  }
  return 'text-33404d';
});

</script>
<template>
  <button
    class="flex items-center py-2 px-3 gap-2 rounded-24px bg-white"
    :class="[ isActive ? 'shadow-nft-start-card' : 'border border-d9e8ee']"
  > 
    <span
      class="w-2.5 h-2.5 rounded-full"
      :class="statusClass"
    ></span>
    <p
      class="font-LatoWebSemibold text-16px leading-1.5 font-semibold"
      :class="labelClass"
    >
      {{ label }}
    </p>
  </button>
</template>
