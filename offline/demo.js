import { CATALOGUE, byId } from "../src/data/catalogue";
import { answerQuestion, GREETING, SAMPLE_QUESTIONS, DEMO_BANNER } from "../src/lib/retrieval";

const MAX_TURNS = 6;
const STORAGE_KEY = "ecommerce-demo-concierge-turns";

/** @type {{role:string,text:string,sources?:string[],focus?:string[]}[]} */
let turns = [];
try {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw) turns = JSON.parse(raw);
} catch {}

let filter = "All";
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
];

const imgSrc = (p) => p.image;

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

function route() {
  const h = location.hash.replace(/^#/, "");
  if (h.startsWith("/catalogue")) return "catalogue";
  if (h.startsWith("/concierge")) return "concierge";
  return "home";
}

function header(active) {
  const link = (href, label, key) =>
    `<a href="#${href}" class="${active === key ? "active" : ""}">${label}</a>`;
  return `
  <div class="banner">${esc(DEMO_BANNER)}</div>
  <header class="site">
    <div class="inner">
      <a class="brand" href="#/">
        <span class="disc">E</span>
        <span>
          <h1>Ecommerce Concierge</h1>
          <small>Public prototype</small>
        </span>
      </a>
      <nav class="site">
        ${link("/", "Home", "home")}
        ${link("/catalogue", "Catalogue", "catalogue")}
        ${link("/concierge", "Concierge", "concierge")}
      </nav>
    </div>
    <div class="braid-rule"></div>
  </header>`;
}

function cardHtml(p) {
  return `
  <button type="button" class="card leaf-corners gold-frame ${p.stock === "Out of Stock" ? "oos" : ""}" data-sku="${p.id}">
    <span class="imgwrap"><img src="${imgSrc(p)}" alt="${esc(p.name)} — ${p.id}" loading="lazy" /></span>
    <span class="body">
      <span class="top">
        <h4>${esc(p.name)}</h4>
        <span class="sku">${p.id}</span>
      </span>
      <span class="meta">${esc(p.category)} · ${esc(p.material)} · ${esc(p.weight)}</span>
      <span class="wave-rule"></span>
      <span class="foot">
        <span class="price">${p.price}</span>
        <span class="pill ${p.stock === "Available" ? "in" : "out"}">${p.stock}</span>
      </span>
    </span>
  </button>`;
}

function footerHtml() {
  return `<footer class="site hammered">
    <strong>Ecommerce Concierge</strong> · Synthetic catalogue · No backend, payments, or AI API.
  </footer>`;
}

function homeHtml() {
  const featured = CATALOGUE.slice(0, 4);
  return `
  ${header("home")}
  <main>
    <section class="hero">
      <span class="chevrons"></span><span class="rays"></span>
      <div class="content">
        <p class="eyebrow">Ecommerce concierge · Public prototype</p>
        <h2 class="text-gold-leaf">A concierge for every piece we hold</h2>
        <p>Ask about price, material, weight and stock. Every answer is drawn only from the synthetic ten-piece sample catalogue.</p>
        <div class="cta-row">
          <a class="btn-gold" href="#/concierge">Ask the concierge</a>
          <a class="btn-ghost" href="#/catalogue">Browse the catalogue</a>
        </div>
      </div>
    </section>
    <section class="block wrap">
      <div class="section-head">
        <div>
          <h3>Featured pieces</h3>
          <p>Four of the ten pieces in the house catalogue.</p>
        </div>
        <a class="chip" href="#/catalogue">View all ten</a>
      </div>
      <div class="grid">${featured.map(cardHtml).join("")}</div>
    </section>
  </main>
  ${footerHtml()}`;
}

function filtered() {
  return CATALOGUE.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Available" || filter === "Out of Stock") return p.stock === filter;
    if (filter === "Synthetic Stone" || filter === "22K") return p.material.includes(filter);
    return p.category === filter;
  });
}

function catalogueHtml() {
  const rows = filtered();
  return `
  ${header("catalogue")}
  <main class="wrap block">
    <div class="section-head">
      <div>
        <h3>The sample catalogue</h3>
        <p>${rows.length} of ${CATALOGUE.length} pieces shown. Select a piece to ask the concierge about it.</p>
      </div>
    </div>
    <div class="filters">
      ${FILTERS.map((f) => `<button class="chip ${f === filter ? "active" : ""}" data-filter="${f}">${f}</button>`).join("")}
    </div>
    <div class="grid">${rows.map(cardHtml).join("")}</div>
  </main>
  ${footerHtml()}`;
}

function conciergeHtml() {
  const body =
    turns.length === 0
      ? `<div class="greeting">${esc(GREETING)}</div>`
      : turns
          .map((t) => {
            const src =
              t.role === "assistant" && t.sources && t.sources.length
                ? `<p class="sources">Sourced from ${esc(
                    t.sources.map((id) => `${id} ${(byId(id) || {}).name || ""}`.trim()).join(", "),
                  )}</p>`
                : "";
            return `<div class="row ${t.role === "user" ? "user" : "bot"}"><div class="bubble">${esc(t.text)}${src}</div></div>`;
          })
          .join("");
  return `
  ${header("concierge")}
  <main class="wrap chat-layout">
    <section class="panel chat petal-corners gold-frame">
      <div class="head">
        <div>
          <h2>Ecommerce Concierge</h2>
          <p>Answers only from the synthetic sample catalogue.</p>
        </div>
        <button class="btn-sm" id="clear">Clear conversation</button>
      </div>
      <div class="messages" id="messages">${body}</div>
      <div class="composer">
        <div class="samples">
          ${SAMPLE_QUESTIONS.map((s) => `<button class="sample" data-q="${esc(s)}">${esc(s)}</button>`).join("")}
        </div>
        <form id="ask">
          <input id="q" placeholder="Ask about a piece, a metal, a price…" autocomplete="off" />
          <button class="btn-gold" type="submit">Send</button>
        </form>
      </div>
    </section>
    <aside class="panel petal-corners gold-frame">
      <div class="pad">
        <h3 style="color:var(--primary)">Catalogue</h3>
        <p class="meta">Tap a piece to ask about it.</p>
        <div class="aside-list">${CATALOGUE.map(cardHtml).join("")}</div>
      </div>
    </aside>
  </main>`;
}

function persist() {
  turns = turns.slice(-MAX_TURNS * 2);
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(turns));
  } catch {}
}

function send(question) {
  const text = (question || "").trim();
  if (!text) return;
  const result = answerQuestion(text, turns);
  turns.push({ role: "user", text });
  turns.push({
    role: "assistant",
    text: result.text,
    sources: result.sources,
    focus: result.focus,
  });
  persist();
  if (route() !== "concierge") {
    location.hash = "#/concierge";
  } else {
    render();
  }
}

function askAbout(sku) {
  const p = byId(sku);
  if (p) send(`Tell me about ${p.name}`);
}

function render() {
  const app = document.getElementById("app");
  const view = route();
  app.innerHTML =
    view === "catalogue" ? catalogueHtml() : view === "concierge" ? conciergeHtml() : homeHtml();

  app
    .querySelectorAll("[data-sku]")
    .forEach((el) => el.addEventListener("click", () => askAbout(el.getAttribute("data-sku"))));
  app.querySelectorAll("[data-filter]").forEach((el) =>
    el.addEventListener("click", () => {
      filter = el.getAttribute("data-filter");
      render();
    }),
  );
  app
    .querySelectorAll("[data-q]")
    .forEach((el) => el.addEventListener("click", () => send(el.getAttribute("data-q"))));

  const form = document.getElementById("ask");
  if (form) {
    const input = document.getElementById("q");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = "";
      send(v);
    });
    input.focus();
  }
  const clear = document.getElementById("clear");
  if (clear)
    clear.addEventListener("click", () => {
      turns = [];
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
      render();
    });

  const msgs = document.getElementById("messages");
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
  if (view !== "concierge") window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
