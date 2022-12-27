<script setup lang="ts">

// Icons
import Usd from "@/components/icons/Usd.vue"
</script>
<template>
  <div
    class="px-5 pt-5 pb-6 bg-white rounded-lg shadow-carousal-card"
  >
    <div class="px-5 py-42px rounded-lg bg-dcefff">
      <img src="/images/caraousal1.jpg" />
    </div>
    <p class="mt-6 text-left font-LatoWebSemibold text-16px leading-1.5 text-233040">A farm in every apartment</p>
    <p class="mt-1 text-left font-LatoWebRegular text-14px leading-1.5 text-46515a">Regenerative Farming, Sustainability, Zero Hunger</p>
    <div class="mt-8 flex justify-between items-center">
      <div class="flex relative">
        <img class="" src="/images/avatar1.png" />
        <img class="absolute left-6" src="/images/avatar2.png" />
        <img class="absolute left-12" src="/images/avatar1.png" />
      </div>
      <div class="flex gap-1 items-center">
        <Usd />
        <p class="font-LatoWebSemibold text-20px leading-1.6 text-33404d">500,000</p>
      </div>
    </div>
  </div>
</template>
