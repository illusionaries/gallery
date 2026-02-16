<script setup lang="ts">
import GalleryCard from "@/components/GalleryCard.vue";
import RouterLink from "@/components/RouterLink.vue";
import { GalleryInjectionKey } from "@/keys";
import { inject } from "vue";

const galleries = Object.entries(inject(GalleryInjectionKey)!).map(([k, v]) => {
  return { ...v.default, id: k.match(/^\.\/(.*)\.gallery$/)![1]! };
});
</script>
<template>
  <main mx-auto>
    <RouterLink
      block
      w-screen
      h-screen
      cursor-pointer
      v-for="gallery in galleries"
      :key="gallery.id"
      :path="`/gallery/${gallery.id}`"
    >
      <GalleryCard :gallery="gallery" />
    </RouterLink>
  </main>
</template>
