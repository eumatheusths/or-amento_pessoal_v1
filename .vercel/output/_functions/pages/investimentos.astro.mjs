/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { XMLParser } from 'fast-xml-parser';
/* empty css                                         */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Investimentos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Investimentos;
  if (!Astro2.cookies.has("user_session")) return Astro2.redirect("/login");
  let moedas = [];
  let cripto = [];
  let fiis = [];
  let acoes = [];
  let noticias = [];
  try {
    const resFiat = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL");
    const dataFiat = await resFiat.json();
    moedas = [
      { symbol: "D\xF3lar", price: parseFloat(dataFiat.USDBRL.bid), change: parseFloat(dataFiat.USDBRL.pctChange) },
      { symbol: "Euro", price: parseFloat(dataFiat.EURBRL.bid), change: parseFloat(dataFiat.EURBRL.pctChange) }
    ];
    const resCripto = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true");
    const dataCripto = await resCripto.json();
    if (dataCripto.bitcoin) {
      cripto = [
        { symbol: "BTC", price: dataCripto.bitcoin.brl, change: dataCripto.bitcoin.brl_24h_change },
        { symbol: "ETH", price: dataCripto.ethereum.brl, change: dataCripto.ethereum.brl_24h_change },
        { symbol: "SOL", price: dataCripto.solana.brl, change: dataCripto.solana.brl_24h_change }
      ];
    }
    fiis = [
      { symbol: "MXRF11", price: 10.45, change: 0.15 },
      { symbol: "HGLG11", price: 162.3, change: -0.4 },
      { symbol: "KNRI11", price: 159.8, change: 0.22 }
    ];
    acoes = [
      { symbol: "IBOVESPA", price: 128000.5, change: 0.85, isIndex: true },
      // Índice
      { symbol: "PETR4", price: 38.5, change: 1.2 },
      { symbol: "VALE3", price: 68.9, change: -0.5 },
      { symbol: "ITUB4", price: 33.2, change: 0.1 }
    ];
    const resNews = await fetch("https://www.infomoney.com.br/feed/");
    const xmlText = await resNews.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const feed = parser.parse(xmlText);
    noticias = feed.rss.channel.item.slice(0, 3).map((item) => ({
      site: "InfoMoney",
      title: item.title,
      text: item.description ? item.description.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..." : "",
      date: item.pubDate,
      image: "https://placehold.co/600x400/1e3a8a/FFF?text=IM",
      // InfoMoney
      url: item.link
    }));
  } catch (e) {
    console.error("Erro:", e);
  }
  const formatBRL = (val) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  const getCorVar = (val) => val >= 0 ? "text-green-400" : "text-red-400";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-kfg7a7qd": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-6 flex items-center gap-4 bg-blue-900/20 border-b border-blue-800/30" data-astro-cid-kfg7a7qd> <h1 class="text-xl font-bold text-blue-50" data-astro-cid-kfg7a7qd>Mercado Hoje</h1> </div> <main class="max-w-3xl mx-auto px-4 py-6 space-y-8" data-astro-cid-kfg7a7qd> <section data-astro-cid-kfg7a7qd> <h3 class="text-blue-300 text-xs uppercase font-bold mb-3 px-1 flex justify-between" data-astro-cid-kfg7a7qd> <span data-astro-cid-kfg7a7qd>Moedas (Câmbio)</span> <span class="text-[10px] text-green-400 animate-pulse" data-astro-cid-kfg7a7qd>● Ao Vivo</span> </h3> <div class="grid grid-cols-2 gap-3" data-astro-cid-kfg7a7qd> ${moedas.map((item) => renderTemplate`<div class="bg-blue-900/40 border border-blue-800/50 p-4 rounded-2xl" data-astro-cid-kfg7a7qd> <div class="flex justify-between mb-1" data-astro-cid-kfg7a7qd> <span class="font-bold text-white" data-astro-cid-kfg7a7qd>${item.symbol}</span> <span${addAttribute(`text-xs font-bold ${getCorVar(item.change)}`, "class")} data-astro-cid-kfg7a7qd>${item.change > 0 ? "+" : ""}${item.change.toFixed(2)}%</span> </div> <span class="text-xl font-bold text-blue-50" data-astro-cid-kfg7a7qd>${formatBRL(item.price)}</span> </div>`)} </div> </section> <section data-astro-cid-kfg7a7qd> <h3 class="text-blue-300 text-xs uppercase font-bold mb-3 px-1" data-astro-cid-kfg7a7qd>Criptomoedas</h3> <div class="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide" data-astro-cid-kfg7a7qd> ${cripto.map((item) => renderTemplate`<div class="min-w-[130px] bg-blue-900/20 border border-blue-800/30 p-3 rounded-2xl snap-start" data-astro-cid-kfg7a7qd> <div class="flex justify-between mb-1" data-astro-cid-kfg7a7qd> <span class="font-bold text-purple-300 text-sm" data-astro-cid-kfg7a7qd>${item.symbol}</span> <span${addAttribute(`text-[10px] font-bold ${getCorVar(item.change)}`, "class")} data-astro-cid-kfg7a7qd>${item.change.toFixed(2)}%</span> </div> <span class="text-sm font-bold text-white" data-astro-cid-kfg7a7qd>${formatBRL(item.price)}</span> </div>`)} </div> </section> <section data-astro-cid-kfg7a7qd> <h3 class="text-blue-300 text-xs uppercase font-bold mb-3 px-1" data-astro-cid-kfg7a7qd>Fundos Imobiliários (FIIs)</h3> <div class="flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide" data-astro-cid-kfg7a7qd> ${fiis.map((item) => renderTemplate`<div class="min-w-[130px] bg-blue-900/20 border border-blue-800/30 p-3 rounded-2xl snap-start" data-astro-cid-kfg7a7qd> <div class="flex justify-between mb-1" data-astro-cid-kfg7a7qd> <span class="font-bold text-yellow-300 text-sm" data-astro-cid-kfg7a7qd>${item.symbol}</span> <span${addAttribute(`text-[10px] font-bold ${getCorVar(item.change)}`, "class")} data-astro-cid-kfg7a7qd>${item.change > 0 ? "+" : ""}${item.change}%</span> </div> <span class="text-sm font-bold text-white" data-astro-cid-kfg7a7qd>${formatBRL(item.price)}</span> </div>`)} </div> </section> <section data-astro-cid-kfg7a7qd> <h3 class="text-blue-300 text-xs uppercase font-bold mb-3 px-1" data-astro-cid-kfg7a7qd>Bolsa Brasileira (B3)</h3> <div class="space-y-3" data-astro-cid-kfg7a7qd> ${acoes.map((item) => renderTemplate`<div${addAttribute(`p-4 rounded-2xl flex justify-between items-center ${item.isIndex ? "bg-blue-800/40 border border-blue-500/30" : "bg-blue-900/20 border border-blue-800/30"}`, "class")} data-astro-cid-kfg7a7qd> <div class="flex items-center gap-3" data-astro-cid-kfg7a7qd> <div${addAttribute(`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${item.isIndex ? "bg-green-600 text-white" : "bg-blue-950 text-blue-200"}`, "class")} data-astro-cid-kfg7a7qd> ${item.symbol.substring(0, 4)} </div> <div data-astro-cid-kfg7a7qd> <p class="font-bold text-white text-sm" data-astro-cid-kfg7a7qd>${item.symbol}</p> <p class="text-[10px] text-blue-300" data-astro-cid-kfg7a7qd>${item.isIndex ? "Pontos" : "A\xE7\xE3o BR"}</p> </div> </div> <div class="text-right" data-astro-cid-kfg7a7qd> <p class="font-bold text-white text-sm" data-astro-cid-kfg7a7qd>${item.isIndex ? item.price.toLocaleString("pt-BR") : formatBRL(item.price)}</p> <p${addAttribute(`text-xs font-bold ${getCorVar(item.change)}`, "class")} data-astro-cid-kfg7a7qd>${item.change > 0 ? "+" : ""}${item.change}%</p> </div> </div>`)} </div> </section> <section data-astro-cid-kfg7a7qd> <h3 class="text-blue-300 text-xs uppercase font-bold mb-3 px-1 flex items-center gap-2" data-astro-cid-kfg7a7qd> <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse" data-astro-cid-kfg7a7qd></span>
Plantão InfoMoney
</h3> <div class="space-y-4" data-astro-cid-kfg7a7qd> ${noticias.map((news) => renderTemplate`<a${addAttribute(news.url, "href")} target="_blank" class="block bg-blue-900/20 border border-blue-800/30 rounded-xl p-4 hover:bg-blue-900/40 transition-colors" data-astro-cid-kfg7a7qd> <h2 class="text-white font-bold text-sm mb-1 line-clamp-2" data-astro-cid-kfg7a7qd>${news.title}</h2> <p class="text-xs text-blue-300 line-clamp-1" data-astro-cid-kfg7a7qd>${news.text}</p> <div class="mt-2 flex items-center gap-2 text-[10px] text-blue-500" data-astro-cid-kfg7a7qd> <span class="font-bold text-blue-200" data-astro-cid-kfg7a7qd>${news.site}</span> <span data-astro-cid-kfg7a7qd>•</span> <span data-astro-cid-kfg7a7qd>Ler completa →</span> </div> </a>`)} </div> </section> </main> ` })} `;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/investimentos.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/investimentos.astro";
const $$url = "/investimentos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Investimentos,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
