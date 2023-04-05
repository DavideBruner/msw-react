import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  external: ["react"],
  splitting: false,
  sourcemap: true,
  dts: true,
  minify: true,
  clean: true,
  outDir: "dist",
  format: ["cjs", "esm"],
});
