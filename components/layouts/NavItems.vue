<script setup lang="ts">
import { usePageContext } from "@/pages/_default/usePageContext";

const pageContext = usePageContext();

const props = defineProps({
  layout: {
    type: String,
    required: false,
    default: "horizontal",
  },
});
</script>
<template>
  <ul
    class="font-LatoWebRegular text-16px leading-1.5 text-46515a"
    :class="[layout === 'vertical' ? 'space-y-6' : 'items-center ml-8 flex justify-between pt-0 gap-8']"
  >
    <li>
      <a href="/nft" class="inline-block">Idea NFT
        <div v-if="pageContext.urlPathname === '/nft'" class="h-0.5 rounded bg-3d9f95"></div>
      </a>
    </li>
    <li>
      <a href="/market" class="inline-block">DAO Market
        <div v-if="pageContext.urlPathname === '/market'" class="h-0.5 rounded bg-3d9f95"></div>
      </a>
    </li>
    <li>
      <a href="javascript:void(0)" class="inline-block">DAO Magazine</a>
    </li>
    <li>
      <a href="javascript:void(0)" class="inline-block">FAQs</a>
    </li>
  </ul>
</template>
