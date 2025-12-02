/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { i as importTransactions } from '../chunks/db_DKZoXnuO.mjs';
import Papa from 'papaparse';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Importar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Importar;
  if (!Astro2.cookies.has("user_session")) return Astro2.redirect("/login");
  let erro = "";
  function adivinharCategoria(descricao) {
    const d = descricao.toLowerCase();
    if (d.includes("uber") || d.includes("99") || d.includes("posto") || d.includes("combustivel")) return "Transporte";
    if (d.includes("ifood") || d.includes("mercado") || d.includes("padaria") || d.includes("restaurante")) return "Alimenta\xE7\xE3o";
    if (d.includes("netflix") || d.includes("spotify") || d.includes("cinema")) return "Lazer";
    if (d.includes("farmacia") || d.includes("medico")) return "Sa\xFAde";
    if (d.includes("luz") || d.includes("agua") || d.includes("internet") || d.includes("claro") || d.includes("vivo")) return "Contas";
    if (d.includes("salario")) return "Sal\xE1rio";
    return "Outros";
  }
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const file = formData.get("csv_file");
      const userId = Astro2.cookies.get("user_session")?.value;
      if (!file || file.size === 0) {
        erro = "Selecione um arquivo CSV.";
      } else {
        const text = await file.text();
        const result = Papa.parse(text, { header: true, skipEmptyLines: true, transformHeader: (h) => h.trim().toLowerCase() });
        if (result.errors.length > 0) {
          erro = "Erro no formato do CSV.";
        } else {
          const transacoesFormatadas = result.data.map((row) => {
            let valorLimpo = row.valor || row.amount || "0";
            valorLimpo = valorLimpo.toString().replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
            const desc = row.descricao || row.description || "Importado";
            const cat = row.categoria || row.category || adivinharCategoria(desc);
            return {
              user_id: userId,
              date: row.data || row.date || (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"),
              description: desc,
              amount: parseFloat(valorLimpo),
              type: (row.tipo || row.type || "").toLowerCase().includes("ent") ? "entrada" : "saida",
              category: cat,
              method: "pix"
            };
          });
          const validas = transacoesFormatadas.filter((t) => t.amount > 0);
          const qtd = await importTransactions(validas);
          if (qtd > 0) return Astro2.redirect("/dashboard?msg=import_sucesso");
          else erro = "Todos os itens j\xE1 existiam no sistema.";
        }
      }
    } catch (e) {
      erro = "Erro interno.";
    }
  }
  const csvContent = "data,descricao,valor,tipo\n20/11/2025,Uber Viagem,25.50,saida\n21/11/2025,Sal\xE1rio Mensal,5000,entrada";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-6 bg-blue-900/20 border-b border-blue-800/30 flex items-center gap-4"> <a href="/dashboard" class="p-2 bg-blue-900 rounded-lg text-blue-400 hover:bg-blue-800 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> </a> <h1 class="text-xl font-bold text-blue-50">Importar CSV</h1> </div> <main class="max-w-2xl mx-auto px-4 py-8 space-y-8"> ${erro && renderTemplate`<div class="bg-red-500/20 text-red-200 p-4 rounded-xl border border-red-500/50 text-center">${erro}</div>`} <div class="bg-blue-900/40 p-6 rounded-2xl border border-blue-800/50"> <h2 class="text-lg font-bold text-white mb-2">1. Baixe o Modelo</h2> <p class="text-blue-300 text-sm mb-4">Preencha no Excel e salve como CSV.</p> <a${addAttribute(`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`, "href")} download="modelo_finance_storm.csv" class="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 border-dashed py-3 rounded-xl transition-all font-bold"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"></path></svg>
Baixar Modelo
</a> </div> <div class="bg-blue-900/40 p-6 rounded-2xl border border-blue-800/50"> <h2 class="text-lg font-bold text-white mb-4">2. Envie o Arquivo</h2> <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="file" name="csv_file" accept=".csv" required class="block w-full text-sm text-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white file:hover:bg-blue-400 cursor-pointer"> <button type="submit" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg">Importar e Categorizar</button> </form> </div> </main> ` })}`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar.astro";
const $$url = "/importar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Importar,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
