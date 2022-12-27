<template>
  <LoginSignup id="landingsignup" :modal="signInModalPopUp" @closeModal="signInModalPopUp=false"/>
</template>
<script setup lang="ts">
  import { ref } from "vue";
  import LoginSignup from "@/components/accounts/LoginSignup.vue";
  const signInModalPopUp = ref(true);
</script>
