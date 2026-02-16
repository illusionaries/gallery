import type { Plugin } from "vite";
import { parse } from "yaml";
import type { Gallery } from "@/model";
import { imageDimensionsFromStream } from "image-dimensions";
import { createReadStream } from "fs";

export default function GalleryLoaderPlugin(): Plugin {
  return {
    name: "vite-plugin-gallery-loader",
    async transform(code, id) {
      if (id.endsWith(".gallery")) {
        const gallery = parse(code) as Gallery;
        for (const image of gallery.images) {
          const imagePath = `./public${image.imageSrc}`;
          const imageStream = ReadableStream.from(createReadStream(imagePath));
          const dimensions = await imageDimensionsFromStream(imageStream);
          image.width = dimensions?.width;
          image.height = dimensions?.height;
        }
        return `export default ${JSON.stringify(gallery)}`;
      }
    },
  };
}
