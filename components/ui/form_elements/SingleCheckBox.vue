<template>
  <div class="flex items-center">
    <div
      class="flex items-center justify-center w-6 h-6 rounded border mr-2 cursor-pointer"
      :class="{ 'border-green-500': check, 'border-dark-400': !check }"
      style="min-width: 24px;min-height: 24px;max-width: 24px;max-height: 24px;"
      @click="UserClicked(id, check, label)"
      :id="`${id}`"
    >
      <GreenCheck v-if="check" class="w-6 h-6" alt="check" />
    </div>
    <div
      class="para-14 text-dark-500 cursor-pointer"
      @click="UserClicked(id, check, label)"
    >
      {{ label }}
      <span v-if="score">: </span>
      <span v-if="score" class="text-green-500">{{ score }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { inject, watch } from 'vue';
  import GreenCheck from "@/components/icons/GreenCheck.vue"
  export interface Props {
    label?: string,
    score?: string|null,
    checked: boolean,
    category_choice: number,
    id: number|null,
  };
  const props = withDefaults(defineProps<Props>(), {
    score: null,
    checked: false,
    id: null,
  });
  const emit = defineEmits(['check_box']);
  const $timestampLog:any = inject('$timestampLog');
  let check = props.checked;
  const UserClicked = (id:number|null, check:boolean, label?:string) => {
    emit('check_box', {
      id: id,
      check: !check,
      label: label,
      category_choice: props.category_choice,
    });
  };
  watch(() => check, (ol) => {
    $timestampLog('Check--value', ol);
  });
</script>
