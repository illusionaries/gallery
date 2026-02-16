<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, ref } from "vue";
import type { Image } from "../model/index";

const props = defineProps<{
  image: Image;
}>();

const inner = useTemplateRef("inner");
const innerHeight = ref(0);
let observer: ResizeObserver | null = null;

onMounted(() => {
  if (!inner.value) return;
  observer = new ResizeObserver((entries) => {
    if (!entries[0]) return;
    innerHeight.value = entries[0].contentRect.height;
  });
  observer.observe(inner.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div
    relative
    shadow-lg
    class="group"
    hover:scale-105
    hover:z-100
    transition-transform
    duration-300
  >
    <img
      block
      :src="image.imageSrc"
      object-cover
      loading="lazy"
      :width="image.width"
      :height="image.height"
      w-full
      h-auto
    />
    <div
      absolute
      bottom-0
      translate-y-100%
      left-0
      right-0
      transition-all
      duration-300
      z-100
      group-hover:shadow-xl
      class="outer"
      :style="{
        '--inner-height': `${innerHeight}px`,
      }"
    >
      <div ref="inner">
        <div p-3 bg-light dark:bg-dark-800>
          <h3 m-1>{{ image.title }}</h3>
          <p m-1 text-sm opacity-80 v-if="image.description">
            {{ image.description }}
          </p>
          <p m-1 text-sm opacity-80 v-if="image.additionalInfo">
            {{ image.additionalInfo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg {
  mask-image: linear-gradient(to bottom, transparent, white 1rem);
}

.outer {
  height: 0;
  opacity: 0;
  overflow: clip;
}

.group:hover .outer {
  opacity: 1;
  height: var(--inner-height);
}
</style>
