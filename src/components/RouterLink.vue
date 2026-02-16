<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{
  path: string;
}>();

const router = useRouter();

const navigateTo = (path: string) => {
  document.startViewTransition(() => {
    router.push(path);
  });
};
</script>

<template>
  <a @click.prevent="navigateTo(path)"><slot /></a>
</template>
