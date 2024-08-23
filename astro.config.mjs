import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  base: "/pop-corn-show",
  outDir: "./pop-corn-show",
  publicDir: "./public",

  // Exemple : Exiger une barre oblique finale pendant le développement
  trailingSlash: "always",
});
