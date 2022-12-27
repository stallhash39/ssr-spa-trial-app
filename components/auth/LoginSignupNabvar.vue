<template>
  <div class="bg-dark-100 py-5 text-center text-black">
    <span
      class="font-nunito-bold mx-2 text-xl font-bold cursor-pointer"
      v-bind:class="{ 'active-tab': tab === 'signin' }"
      @click="tabChange('signin')"
      >SIGN IN</span
    >
    <span class="ml-6 mr-8 seperator inline-block align-middle"></span>
    <span
      class="font-nunito-bold mx-2 text-xl font-bold cursor-pointer"
      v-bind:class="{ 'active-tab': tab === 'signup' }"
      @click="tabChange('signup')"
      >SIGN UP</span
    >
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  export interface Props {
    tabby: string;
  };
  const props = withDefaults(defineProps<Props>(), {
    tabby: 'signin',
  });
  const emit = defineEmits(['changeTab']);
  const tab = ref(props.tabby);
  const tabChange = function (val:string) {
    tab.value = val;
    emit("changeTab", val);
  };
</script>
<style scoped>
.seperator {
  width: 1px;
  height: 33px;
  background-color: #b2c4cd;
}
.active-tab {
  border-bottom: 2px solid #4072b9;
}
</style>
