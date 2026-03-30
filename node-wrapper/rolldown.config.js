import { defineConfig } from "rolldown";
import { fileURLToPath } from "node:url";
import { resolve as resolvePath } from "node:path";

// @actions/artifact only exposes its public API via the package "exports" map.
// We import internal subpaths directly, so resolve them to their .js files via
// per-package aliases.
const artifactBase = resolvePath(
  fileURLToPath(import.meta.url),
  "../node_modules/@actions/artifact",
);
const artifactInternals = [
  "lib/internal/upload/path-and-artifact-name-validation.js",
  "lib/internal/shared/artifact-twirp-client.js",
  "lib/internal/shared/util.js",
  "lib/internal/upload/retention.js",
  "lib/internal/upload/stream.js",
  "lib/internal/upload/blob-upload.js",
  "lib/internal/upload/types.js",
  "lib/generated/index.js",
  "lib/internal/shared/errors.js",
];
const alias = Object.fromEntries(
  artifactInternals.map((p) => [
    `@actions/artifact/${p}`,
    `${artifactBase}/${p}`,
  ]),
);

export default defineConfig({
  input: "artifact_node_wrapper.js",
  output: {
    file: "../gha_artifact_client/_vendor/artifact_node_wrapper.mjs",
    format: "esm",
    minify: true,
  },
  platform: "node",
  // Do not read tsconfig.json: its `paths` aliases point to .d.ts files (for
  // tsc's benefit) and rolldown would resolve imports to those type declaration
  // files instead of the actual .js sources.
  tsconfig: false,
  resolve: {
    alias,
  },
});
