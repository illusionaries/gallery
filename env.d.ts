/// <reference types="vite/client" />

declare module '*.gallery' {
    import type { Gallery } from '@/model';
    const gallery: Gallery;
    export default gallery;
}

declare module 'virtual:routes.ts' {
    import type { RouteRecordRaw } from 'vue-router';
    const routes: RouteRecordRaw[];
    export default routes;
}

declare module 'virtual:galleries.ts' {
    import type { Gallery } from '@/model';
    const galleries
}