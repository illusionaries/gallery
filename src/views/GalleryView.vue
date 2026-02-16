<script setup lang="ts">
import { useRoute } from "vue-router";
import { GalleryInjectionKey } from "@/keys";
import { inject, useSSRContext } from "vue";
import ImageCard from "@/components/ImageCard.vue";
import Footer from "@/components/Footer.vue";
import { useTitle } from "@vueuse/core";
import RouterLink from "@/components/RouterLink.vue";

const galleries = inject(GalleryInjectionKey)!;
const route = useRoute();
const galleryId = route.params.id as string;
const galleryModuleId = `./${galleryId}.gallery`;
const gallery = galleries[galleryModuleId]?.default;

useTitle(gallery?.location || "Not Found");
if (import.meta.env.SSR) {
  const ctx = useSSRContext();
  if (ctx) {
    ctx.title = gallery?.location || "Not Found";
  }
}
</script>
<template>
  <main max-w-1000px mx-auto py-12 px-2 min-h-screen flex="~ col">
    <div v-if="gallery">
      <h1 m-0>
        {{ gallery.location }}
      </h1>
      <p mt-1>
        {{ gallery.date }}
      </p>
      <div columns-1 sm:columns-2 lg:columns-3 gap-2>
        <ImageCard
          mt-2
          first:mt-0
          v-for="(image, index) in gallery.images"
          :key="image.imageSrc"
          :image="image"
          class="fade-in"
          :style="{
            '--animation-step': index,
          }"
        />
      </div>
    </div>
    <div v-else>
      <h1 m-0>404 Not Found</h1>
      <p mt-1>
        <RouterLink
          path="/"
          underline="~ offset-2 gray-200 hover:current"
          color-gray-500
          hover:color-inherit
          transition-colors
          duration-300
          cursor-pointer
          >Return to Home</RouterLink
        >
      </p>
    </div>
    <div flex-1></div>
    <Footer mt-12 />
  </main>
</template>

<style lang="css" scoped>
.fade-in {
  --animation-step: 0;
  --animation-duration: 300ms;
  animation-name: fadeIn;
  animation-delay: calc(var(--animation-step) * 50ms);
  animation-duration: var(--animation-duration);
  animation-fill-mode: backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(1em);
    filter: blur(0.5em);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>
