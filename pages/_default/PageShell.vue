<template>
    <div class="layout">
      <div class="navigation">
        <a href="/" class="logo">
          <img src="./logo.svg" height="64" width="64" alt="logo" />
        </a>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
      <div class="content">
        <slot />
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import Link from '@/components/Link.vue';
  </script>