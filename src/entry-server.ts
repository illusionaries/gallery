import { createApp } from "./app";
import { renderToString, type SSRContext } from "vue/server-renderer";

export async function render(path: string) {
  const { app, router } = createApp();
  router.push(path);
  await router.isReady();
  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);
  return { html, ctx };
}
