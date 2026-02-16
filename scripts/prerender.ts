import * as fs from "fs/promises";
import fg from "fast-glob";
import { basename, dirname } from "path";

const render = (await import("../dist/server/entry-server.js" as string).then(
  (mod) => mod.render,
)) as (path: string) => Promise<{ html: string; ctx: Record<string, any> }>;
const template = await fs.readFile("dist/client/index.html", "utf-8");
const manifest = JSON.parse(
  await fs.readFile("dist/client/.vite/ssr-manifest.json", "utf-8"),
) as Record<string, string[]>;

const routes = await fg("data/*.gallery", { objectMode: true }).then((x) =>
  x.map(({ name }) => {
    const id = name.replace(/\.gallery$/, "");
    return `/gallery/${id}`;
  }),
);

routes.push("/");

for (const route of routes) {
  const { html, ctx } = await render(route);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  const finalHtml = template
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--app-html-->`, html)
    .replace(`<!--title-->`, ctx.title || "Gallery");
  const filePath =
    "dist/client" + (route === "/" ? "/index.html" : `${route}.html`);
  const fileDir = dirname(filePath);
  await fs.mkdir(fileDir, { recursive: true });
  await fs.writeFile(filePath, finalHtml, "utf-8");
}

function renderPreloadLinks(
  modules: Set<string>,
  manifest: { [key: string]: string[] },
) {
  let links = "";
  const seen = new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}

function renderPreloadLink(file: string) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
