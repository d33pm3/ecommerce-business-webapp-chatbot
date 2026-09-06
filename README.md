# Ecommerce Business Webapp Chatbot

**Author:** DK Mendiratta

A public, client-side ecommerce prototype that combines a browsable product catalogue with a deterministic conversational assistant. It demonstrates catalogue retrieval, product filtering, follow-up questions, price calculations, quote export, and consultation capture without a backend, payment service, or external AI API.

Neighbour repo: [jewelry-product-showcase](https://github.com/d33pm3/jewelry-product-showcase) is the Ornativa jewellery showcase. This repo is the catalogue + deterministic concierge prototype.

> **Demo data only:** every product, SKU, price, stock status, illustration, and customer interaction in this repository is synthetic. Do not treat displayed prices, taxes, availability, or generated quotes as commercial advice or a real offer.

## This is / this is not

**This is** an unofficial client-side ecommerce **prototype**: catalogue, deterministic concierge, quote export.
**This is** a local TanStack / React app; answers come only from `src/data/catalogue.ts`.
**This is** demo data only — prices, stock, and quotes are synthetic.
**This is not** a live store, cart, or payment system.
**This is not** an LLM chatbot and not an external AI API.
**This is not** [jewelry-product-showcase](https://github.com/d33pm3/jewelry-product-showcase) (that repo is the Ornativa jewellery showcase).
**This is not** a hosted shop or a production catalogue.
**This is not** commercial advice or an offer for sale.

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

## Run locally

Requirements: Node.js 22 or later and npm 10 or later. `src/` is already on `main` — no zip extract.

```bash
git clone https://github.com/d33pm3/ecommerce-business-webapp-chatbot.git
cd ecommerce-business-webapp-chatbot
npm ci
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## What is not deployed

- There is no hosted URL, GitHub Pages site, or live shop.
- There is no cart, checkout, payment API, or external AI call.
- Form submissions and conversations stay in the browser.
- Do not treat prices, taxes, stock, or quotes as an offer for sale.

## Offline demo

```bash
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

MIT. See `LICENSE`.

You may use this code; this is not a live store, not a checkout, and not a live chatbot.
