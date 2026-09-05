# Security Policy

## Supported version

Security fixes are applied to the latest commit on `main`.

## Reporting a vulnerability

Do not open a public issue containing a secret, personal data, or an exploitable vulnerability. Use GitHub's private vulnerability reporting feature on this repository when it is available. Include the affected path, impact, reproduction steps, and a suggested mitigation if known.

## Public-data rule

This repository must contain only synthetic catalogue and interaction data. Never commit:

- credentials, tokens, keys, certificates, or `.env` files;
- customer, employee, or client records;
- internal URLs, hostnames, infrastructure names, or production configuration;
- private prompts, retrieval corpora, vector stores, embeddings, or model traces;
- generated builds, logs, caches, local databases, screenshots, or exports.

If sensitive material is committed, revoke or rotate any affected credential first, then remove the material from the repository and its history.
