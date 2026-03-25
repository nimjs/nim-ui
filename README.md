# Nim UI

Nim UI is an open-source UI ecosystem monorepo built for organizations that want
the developer experience of a modern component system without coupling docs,
tokens, releases, and governance into ad hoc tooling.

The repository is intentionally structured as a product, not just a package:

- `packages/registry` is the typed component registry shared by CLI and docs.
- `packages/tokens` is the source of truth for design tokens and semantic themes.
- `packages/ui` ships the baseline React component library.
- `packages/utils` holds shared utilities with low abstraction overhead.
- `packages/cli` lays the groundwork for future `init` and `add` workflows.
- `apps/docs` is a Next.js App Router docs and demo experience.
- `.github`, `.changeset`, and the policy files make release and contribution
  workflows explicit from day one.

## Why this repo exists

Nim UI is inspired by the experience quality of tools like shadcn-style
ecosystems, but it is designed as an independent open-source project with:

- clear package boundaries
- contributor-friendly architecture
- maintainable release mechanics
- room for future registry and CLI evolution

## Architecture Overview

```text
apps/
  docs/                  Next.js docs and demo app
packages/
  cli/                   CLI foundation for init/add workflows
  eslint-config/         Shared ESLint presets
  registry/              Typed component manifests for docs and CLI
  tokens/                Design tokens, semantic themes, CSS variables
  tsconfig/              Shared TypeScript presets
  ui/                    React UI component package
  utils/                 Shared utility helpers
tooling/                 Repo-level helper scripts and test setup
.changeset/              Versioning and release notes
.github/                 CI/CD, issue templates, automation
```

## Package Map

- `@nim-ui/tokens`
  Primitive palette, semantic theme mapping, and exported CSS variables.
- `@nim-ui/registry`
  Typed component manifests, dependency metadata, and future registry surface.
- `@nim-ui/ui`
  Baseline component library: `Button`, `Input`, `Card`, `Badge`.
- `@nim-ui/utils`
  Shared helpers such as `cn()` and DOM-safe utilities.
- `@nim-ui/cli`
  Foundation for future local and registry-backed component scaffolding.
- `@nim-ui/eslint-config`
  Shared ESLint presets for library packages and Next.js apps.
- `@nim-ui/tsconfig`
  Shared strict TypeScript presets.
- `@nim-ui/docs`
  Documentation and demo application.

## Design Tokens And Theming

The visual system starts from a palette inspired by the product brand and maps
those primitives into semantic variables such as `--background`, `--foreground`,
`--primary`, and `--card`. The light theme is implemented today, while the CSS
variable structure already leaves room for a future dark theme.

Key rule: do not hardcode colors in packages or apps. Use semantic variables or
token exports from `@nim-ui/tokens`.

## Local Development

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
pnpm changeset
```

`pnpm dev` runs the docs app together with watch builds for its workspace
dependencies via Turborepo.

## Release Flow

Releases are managed through Changesets.

1. Contributors add a changeset for user-facing package changes.
2. Maintainers merge the changes into `main`.
3. The release workflow opens or updates a release PR.
4. Merging the release PR triggers versioning and npm publication.

This keeps semantic release intent in git history and makes breaking changes
reviewable before publish.

## Contribution Flow

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch expectations, naming
conventions, API compatibility policy, and the component authoring workflow.

See [GOVERNANCE.md](./GOVERNANCE.md) for maintainer roles and architectural
decision rules.

## Docs Deployment

The repository is Vercel-friendly by default. The `docs.yml` workflow validates
the docs build in CI without coupling the project to a specific deployment
secret or preview provider. This keeps the repository portable while fitting the
Next.js App Router well.

PR preview deployment is intentionally not included in baseline automation
because the cleanest implementation is usually provider-native and tied to repo
ownership, domains, and environment configuration.

## CLI Roadmap

The CLI package currently includes:

- registry-driven component lookup
- `nim-ui.config.ts` resolution with defaults
- config resolution
- `init`
- local registry metadata
- `add <component>`
- template scaffolding

Future work can layer remote registry manifests, project adapters, and canary
channels on top of the existing package boundaries without rewriting the CLI.

## Canary Releases

Canary publishing is intentionally not wired into default automation yet, but the
repository is ready for it through Changesets pre mode. A practical next step is
to add maintainer scripts for:

- `changeset pre enter canary`
- `changeset version`
- `changeset publish --tag canary`
- `changeset pre exit`

That approach keeps stable releases and canary channels separate without forcing
extra complexity into the default OSS workflow.

## Open-Source Baseline

This repository includes:

- code of conduct
- contribution and governance policy
- security policy
- support guidance
- issue and PR templates
- CODEOWNERS
- Dependabot configuration
- CI, docs validation, release automation, dependency review, and CodeQL

Before publishing, make sure the GitHub teams and contact channels you use under
the `nimjs` organization match your actual maintainer setup.

## License

This scaffold defaults to MIT for ease of adoption in a component ecosystem. MIT
keeps contribution and downstream usage simple, but it provides fewer explicit
patent guarantees than Apache-2.0. If the organization expects a stronger
patent position, evaluate Apache-2.0 or a dual-license policy before the first
public release.
