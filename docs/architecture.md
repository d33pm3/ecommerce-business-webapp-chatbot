# Architecture

## Purpose

This repository is a safe, reusable prototype for a product-catalogue web application with a deterministic conversational interface.

## Runtime flow

1. `src/data/catalogue.ts` loads a synthetic product catalogue and local SVG illustrations.
2. Catalogue routes filter and render the products in the browser.
3. `src/lib/retrieval.ts` normalizes a user's question, detects requested fields and filters, resolves product names or SKUs, and returns an answer with source SKU references.
4. Short conversation context is held in session storage to support follow-up questions.
5. The pricing calculator derives totals from catalogue values; the quote summary is produced locally.
6. Consultation requests are validated and stored only in the current browser.

## Trust boundaries

- No user data leaves the browser in the supplied implementation.
- No model, payment, analytics, authentication, database, or third-party commerce service is connected.
- All displayed data is synthetic and intended only for demonstration.

## Production extension points

A production build should place catalogue access, pricing, inventory, quote creation, and consultation handling behind authenticated APIs. Add authorization, consent, encryption, retention rules, rate limiting, observability, audit logs, automated tests, and deployment-specific secrets management before processing real transactions or personal data.
