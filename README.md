# Welcome to Hydralite

![SemVer - API Version](https://img.shields.io/badge/version-1.0.0--pre--alpha-ff69b4)
![LOC](https://img.shields.io/tokei/lines/github/hydralite/hydralite?color=white&label=lines%20of%20code)
![Top Language](https://img.shields.io/github/languages/top/hydralite/hydralite?color=%230xfffff)
![Repo Size](https://img.shields.io/github/repo-size/hydralite/hydralite?color=orange)

## What Is Hydralite?

Hydralite is an open-source, next-generation project marketing and management platform that uses a platform-specific "currency" called Hydra, which enables you to build a vast community around your product using an algorithmic, promotional feed of content, as well as to conduct your software effectively with an intuitive, one-of-a-kind product management framework.

## Project Components

- [`web`](./web) - frontend Next.js web app
- [`cli`](./cli) - CLI
- [`hydrabot`](./hydrabot) - Hydralite Discord Bot
- [`landing`](./landing) - Landing Page
- [`mobile`](./mobile) - Flutter mobile app
- [`cz-commitlint-config`](./cz-commitlint-config) - custom types based on `@commitlint/config-conventional` NPM package and our custom Commitizen adapter based on `cz-conventional-changelog`
- [`repo:prototypes`](https://github.com/hydralite/prototypes) - Prototypes
- [`repo:api`](https://github.com/hydralite/Go-API) - API (closed source)

## Quick Start for Development

Although we highly recommend reading [the contributing guidelines/docs](https://github.com/hydralite/hydralite/blob/dev/CONTRIBUTING.md), here's the fastest way to get started.

Make sure you've installed Node.js (Web, API, landing, Discord bot), Python (automation), Rust (CLI) and/or Flutter + Dart (Mobile App) before start hacking/contributing within your local machine, especially if you use [code-server](https://github.com/cdr/code-server) in an PaaS where Dockerfiles are supported.

To start both the frontend webapp and the GraphQL API backend servers:

1. Navigate to the root directory and install dependencies with `yarn` (or `yarn install`)
2. Then, run an intuitive setup procedure with `yarn setup`. It'll ask you what you need to enter below in order to generate an `.env` file. You can also create that file manually from `.env.example` in the API directory and edit manually if you want.
   - OAuth client IDs and secrets for: GitHub, Discord and Google (you can skip if you don't have these, but this might fire up some errors when you start it)
   - Postgres database URL string for data storage and Prisma database migrations. (we are not using prisma anymore).
   - Redis URL for data cache.
3. Once setup is complete, run `yarn dev` to start both the web app and API server in development mode.

**Other Ways To Get Started:**

- [With Docker](https://github.com/hydralite/hydralite/blob/dev/CONTRIBUTING.md#using-docker)
- [On Gitpod](https://github.com/hydralite/hydralite/blob/dev/CONTRIBUTING.md#using-gitpod)

## Sponsors

<a href="https://yomo.run">![YoMo.run](https://github.com/hydralite/hydralite/blob/dev/assets/sponsors/yomo.png?raw=true)</a>
