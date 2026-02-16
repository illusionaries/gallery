import type { InjectionKey } from "vue";
import type { Gallery } from "./model";

export const GalleryInjectionKey = Symbol("galleries") as InjectionKey<
  Record<string, { default: Gallery }>
>;
