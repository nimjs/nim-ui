# @nim-ui/cli

Foundation CLI for Nim UI.

Current commands:

- `nim-ui init`
- `nim-ui add <component>`

The current implementation is intentionally small, but the package layout already
supports:

- command modules
- registry-driven component lookup
- config resolution
- local templates
- future remote registry support

`nim-ui add` now reads from `@nim-ui/registry`, resolves basic dependencies, and
loads `nim-ui.config.ts` when present.
