<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  path: string;
}>();

const router = useRouter();
const resolvedPath = router.resolve(props.path).href;

const navigateTo = (path: string) => {
  document.startViewTransition(() => {
    router.push(path);
  });
};
</script>

<template>
  <a :href="resolvedPath" @click.prevent="navigateTo(props.path)"><slot /></a>
</template>
