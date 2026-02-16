<script setup lang="ts">
import type { Gallery } from "@/model";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ gallery: Gallery & { id: string } }>();

const currentIndex = ref(0);
let interval: number | null = null;
onMounted(() => {
  if (props.gallery.images.length > 1) {
    interval = window.setInterval(() => {
      currentIndex.value =
        (currentIndex.value + 1) % props.gallery.images.length;
    }, 5000);
  }
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <div relative top-0 left-0 w-full h-full class="group">
    <Transition name="fade">
      <img
        absolute
        :key="currentIndex"
        block
        :src="gallery.images[currentIndex]!.imageSrc"
        w-full
        h-full
        object-cover
        v-if="gallery.images[currentIndex]"
      />
    </Transition>
    <div
      absolute
      top-0
      bottom-0
      left-0
      right-0
      flex="~ col items-center justify-center"
      class="bg-black/50"
      text-white
      transition-all
      duration-300
      :style="{
        textShadow: '0 0 10px rgb(0 0 0 / 70%)',
      }"
      group-hover="bg-black/40 backdrop-blur-lg"
    >
      <h2 m-0 font-black text-5xl>
        {{ gallery.location }}
      </h2>
      <p m-t2 font-bold>
        {{ gallery.date }}
      </p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
