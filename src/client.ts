let entrypoints = [import.meta.dir + "/ws.client.js"];
const result = await Bun.build({
  entrypoints,
  target: "browser",
  minify: true,
});
let t = result.outputs[0];
export const type = t.type;
export const script = await t.text();
