# Ecommerce Business Webapp Chatbot

A public, client-side ecommerce prototype that combines a browsable product catalogue with a deterministic conversational assistant. It demonstrates catalogue retrieval, product filtering, follow-up questions, price calculations, quote export, and consultation capture without a backend, payment service, or external AI API.

> **Demo data only:** every product, SKU, price, stock status, illustration, and customer interaction in this repository is synthetic. Do not treat displayed prices, taxes, availability, or generated quotes as commercial advice or a real offer.

## Features

- Responsive product catalogue with category, material, and availability filters
- Deterministic closed-book concierge: answers are limited to `src/data/catalogue.ts`
- Follow-up context for questions about previously matched products
- Product pricing, quantity, weight, and indicative-tax calculator
- Downloadable and printable quote summary
- Browser-only consultation form with validation and local storage
- Self-contained offline HTML build
- No API key, database, authentication, analytics, external AI call, or payment integration

## Architecture

The application is a TanStack Start and React prototype. Product retrieval is implemented as deterministic TypeScript rules rather than an LLM, which makes demo answers reproducible and prevents unsupported catalogue claims. Browser storage is used only for the current user's local demo state.

```text
src/
  assets/       Synthetic SVG product illustrations
  components/   Catalogue, calculator, quote, and form UI
  data/         Synthetic catalogue and product types
  lib/          Retrieval and error-handling logic
  routes/       TanStack Start routes
offline/        Self-contained offline-demo builder and UI
docs/           Architecture and public-release notes
```

## Quick start

Requirements: Node.js 22 or later and npm 10 or later.

```sh
git clone https://github.com/d33pm3/ecommerce-business-webapp-chatbot.git
cd ecommerce-business-webapp-chatbot
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validate a change

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

## Offline demo

```sh
npm run build:offline
```

The default output is `dist-offline/ecommerce-concierge-demo.html`. That generated file is intentionally ignored by Git.

## Prototype boundaries

- The concierge is rule-based and supports only the intents encoded in `src/lib/retrieval.ts`.
- Form submissions and conversations remain in the browser; they are not sent anywhere.
- Production use requires a real catalogue source, secure backend, consent and retention controls, authentication where relevant, monitoring, and server-side validation.
- Replace the synthetic illustrations and data only with assets and records you are authorized to publish.

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [SECURITY.md](SECURITY.md) for responsible reporting and public-data rules.

## License

Released under the [MIT License](LICENSE).
