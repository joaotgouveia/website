import { defineConfig } from 'astro/config';
import { transformerNotationHighlight } from '@shikijs/transformers';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    site: 'https://joaotgouveia.com',
    integrations: [tailwind({ applyBaseStyles: false })],
    markdown: {
    shikiConfig: {
        theme: 'dracula',
        transformers: [transformerNotationHighlight()],
    },
  },
});
