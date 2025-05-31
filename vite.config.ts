import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "index",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "@mantine/core",
        "@mantine/hooks",
        "react",
        "react-dom",
        "react-svg-seatmap",
        "**/*.stories.tsx",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mantine/core": "MantineCore",
          "@mantine/hooks": "MantineHooks",
          "react-svg-seatmap": "ReactSvgSeatmap",
        },
      },
    },
  },
});
