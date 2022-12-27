<script setup lang="ts">
import { usePageContext } from "../../pages/_default/usePageContext";

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

</template>
