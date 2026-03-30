# AGENTS.md

## Project layout

- `gha_artifact_client/` — Python package (CLI + API)
- `node-wrapper/` — Node.js source for the vendored node wrapper
- `gha_artifact_client/_vendor/artifact_node_wrapper.mjs` — built node wrapper (committed, do not edit manually)
- `tests/` — pytest unit and integration tests

## Development commands

Install dependencies:
```
uv sync
npm ci  # run from node-wrapper/
```

Lint and type-check:
```
uv run ruff check
uv run ruff format --check
uv run ty check
npm run lint   # from node-wrapper/
npm run tsc    # from node-wrapper/
```

Run unit tests (no live GHA runtime needed):
```
uv run pytest -m 'not integration'
```

If you change anything under `node-wrapper/`, rebuild the vendored file:
```
npm run build  # from node-wrapper/
```
