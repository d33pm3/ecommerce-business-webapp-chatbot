import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { ProductCard } from "@/components/ProductCard";
import { CATALOGUE } from "@/data/catalogue";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Catalogue — Ecommerce Concierge Demo" },
      {
        name: "description",
        content:
          "Ten synthetic products with category, material, weight, price and stock status for prototype use.",
      },
      { property: "og:title", content: "Catalogue — Ecommerce Concierge Demo" },
      {
        property: "og:description",
        content: "Browse a synthetic ten-piece catalogue with price, material, weight and stock.",
      },
    ],
  }),
  component: CataloguePage,
});

const FILTERS = [
  "All",
  "Ring",
  "Necklace",
  "Earrings",
  "Bracelet",
  "Pendant",
  "Available",
  "Out of Stock",
  "Synthetic Stone",
  "22K",
] as const;

function CataloguePage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const navigate = useNavigate();

  const rows = CATALOGUE.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Available" || filter === "Out of Stock") return p.stock === filter;
    if (filter === "Synthetic Stone" || filter === "22K") return p.material.includes(filter);
    return p.category === filter;
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-3xl text-primary">Catalogue</h1>
        <div className="braid-rule mt-3 w-32" />
        <p className="mt-3 text-sm text-muted-foreground">
          Ten synthetic sample products. Tap a card to ask the deterministic concierge about it.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition-all ${
                filter === f
                  ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-halo)]"
                  : "border-border bg-card text-foreground hover:border-gold/60 hover:bg-secondary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={(prod) =>
                navigate({ to: "/concierge", search: { q: `Tell me about ${prod.name}` } })
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
