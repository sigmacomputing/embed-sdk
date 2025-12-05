import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    promises: "src/promises.ts",
  },
  sourcemap: false,
  minify: false,
  dts: true,
  clean: true,
  format: ["esm", "cjs"],
});
