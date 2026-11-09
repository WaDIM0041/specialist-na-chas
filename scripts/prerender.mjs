import { readFile, writeFile } from "node:fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.tsx");
  const content = renderToString(createElement(App));
  const file = new URL("../dist/index.html", import.meta.url);
  const html = await readFile(file, "utf8");
  const placeholder = '<div id="root"></div>';
  if (!html.includes(placeholder)) {
    throw new Error("Не найден корневой элемент для предварительной отрисовки");
  }
  await writeFile(file, html.replace(placeholder, `<div id="root">${content}</div>`));
} finally {
  await server.close();
}
