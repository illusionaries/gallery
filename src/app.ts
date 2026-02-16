import { createApp as createVueApp, createSSRApp } from "vue";
import "./style.css";
import "virtual:uno.css";
import App from "./App.vue";
import type { Gallery } from "./model";
import { GalleryInjectionKey } from "./keys";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const galleries = import.meta.glob<{ default: Gallery }>("./*.gallery", {
  eager: true,
  base: "../data/",
});

const routes = [
  {
    path: "/",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/gallery/:id",
    component: () => import("@/views/GalleryView.vue"),
  },
] satisfies RouteRecordRaw[];

export const createApp = () => {
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, _, savedPosition) {
      if (savedPosition) return savedPosition;
      if (to.path.startsWith("/gallery/")) {
        return { top: 0 };
      }
    },
  });
  const app = (import.meta.env.DEV ? createVueApp(App) : createSSRApp(App))
    .use(router)
    .provide(GalleryInjectionKey, galleries);
  return { app, router };
};
