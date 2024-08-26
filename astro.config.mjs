import { defineConfig } from "astro/config";

const baseUrl = "/ozuhfrhqbodsc44pfjfsens44indfqznrpi4094902";

// https://astro.build/config
export default defineConfig({
  base: baseUrl,
  outDir: "." + baseUrl,
  publicDir: "./public",

  // Exemple : Exiger une barre oblique finale pendant le développement
  trailingSlash: "always",
});
