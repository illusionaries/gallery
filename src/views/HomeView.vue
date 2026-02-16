<script setup lang="ts">
import GalleryCard from "@/components/GalleryCard.vue";
import RouterLink from "@/components/RouterLink.vue";
import { GalleryInjectionKey } from "@/keys";
import { useTitle } from "@vueuse/core";
import { inject, useSSRContext } from "vue";

const galleries = Object.entries(inject(GalleryInjectionKey)!).map(([k, v]) => {
  return { ...v.default, id: k.match(/^\.\/(.*)\.gallery$/)![1]! };
});

useTitle("Galleries");
if (import.meta.env.SSR) {
  const ctx = useSSRContext();
  if (ctx) {
    ctx.title = "Galleries";
  }
}
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
