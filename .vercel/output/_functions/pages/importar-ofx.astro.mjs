/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { i as importTransactions } from '../chunks/db_DKZoXnuO.mjs';
import { parse } from 'node-ofx-parser';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$ImportarOfx = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ImportarOfx;
  if (!Astro2.cookies.has("user_session")) return Astro2.redirect("/login");
  let erro = "";
  let sucesso = "";
  function adivinharCategoria(descricao) {
    const d = descricao.toLowerCase();
    if (d.includes("uber") || d.includes("99") || d.includes("posto") || d.includes("combustivel") || d.includes("estacionamento") || d.includes("transport")) return "Transporte";
    if (d.includes("ifood") || d.includes("rappi") || d.includes("eats") || d.includes("mercado") || d.includes("superm") || d.includes("padaria") || d.includes("restaurante") || d.includes("lanchonete") || d.includes("bk ") || d.includes("mc donald")) return "Alimenta\xE7\xE3o";
    if (d.includes("netflix") || d.includes("spotify") || d.includes("amazon") || d.includes("prime") || d.includes("cinema") || d.includes("jogo") || d.includes("steam") || d.includes("hbo")) return "Lazer";
    if (d.includes("farmacia") || d.includes("drogaria") || d.includes("medico") || d.includes("hospital") || d.includes("saude")) return "Sa\xFAde";
    if (d.includes("aluguel") || d.includes("condominio") || d.includes("luz") || d.includes("energia") || d.includes("agua") || d.includes("saneago") || d.includes("internet") || d.includes("claro") || d.includes("vivo") || d.includes("tim") || d.includes("oi ")) return "Contas";
    if (d.includes("curso") || d.includes("faculdade") || d.includes("escola") || d.includes("udemy") || d.includes("alura")) return "Educa\xE7\xE3o";
    if (d.includes("salario") || d.includes("pagamento") || d.includes("remuneracao")) return "Sal\xE1rio";
    return "Outros";
  }
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const file = formData.get("ofx_file");
      const userId = Astro2.cookies.get("user_session")?.value;
      if (!file || file.size === 0) {
        erro = "Por favor, selecione um arquivo OFX.";
      } else {
        const text = await file.text();
        const data = parse(text);
        const bankMsgs = data.OFX.BANKMSGSRSV1?.STMTTRNRS?.STMTRS?.BANKTRANLIST?.STMTTRN;
        const creditMsgs = data.OFX.CREDITCARDMSGSRSV1?.CCSTMTTRNRS?.CCSTMTRS?.BANKTRANLIST?.STMTTRN;
        let listaBruta = [];
        if (bankMsgs) listaBruta = Array.isArray(bankMsgs) ? bankMsgs : [bankMsgs];
        else if (creditMsgs) listaBruta = Array.isArray(creditMsgs) ? creditMsgs : [creditMsgs];
        if (listaBruta.length === 0) {
          erro = "Nenhuma transa\xE7\xE3o v\xE1lida encontrada neste arquivo.";
        } else {
          const transacoesFormatadas = listaBruta.map((t) => {
            const ano = t.DTPOSTED.substring(0, 4);
            const mes = t.DTPOSTED.substring(4, 6);
            const dia = t.DTPOSTED.substring(6, 8);
            const valor = parseFloat(t.TRNAMT);
            const descricao = t.MEMO || t.NAME || "Transa\xE7\xE3o OFX";
            const categoriaAuto = adivinharCategoria(descricao);
            return {
              user_id: userId,
              date: `${dia}/${mes}/${ano}`,
              description: descricao,
              amount: Math.abs(valor),
              type: valor < 0 ? "saida" : "entrada",
              category: categoriaAuto,
              // <--- AQUI ESTÁ A MÁGICA
              method: creditMsgs ? "credit" : "pix"
            };
          });
          const qtd = await importTransactions(transacoesFormatadas);
          if (qtd > 0) sucesso = `${qtd} lan\xE7amentos novos importados e categorizados!`;
          else sucesso = "Nenhum lan\xE7amento novo (todos j\xE1 existiam).";
        }
      }
    } catch (e) {
      console.error(e);
      erro = "Erro ao ler arquivo. Verifique se \xE9 um OFX v\xE1lido.";
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-6 bg-blue-900/20 border-b border-blue-800/30 flex items-center gap-4"> <a href="/dashboard" class="p-2 bg-blue-900 rounded-lg text-blue-400 hover:bg-blue-800 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> </a> <h1 class="text-xl font-bold text-blue-50">Importação Inteligente (OFX)</h1> </div> <main class="max-w-3xl mx-auto px-4 py-8 space-y-8 pb-32"> ${erro && renderTemplate`<div class="bg-red-500/20 text-red-200 p-4 rounded-xl border border-red-500/50 text-center font-medium">${erro}</div>`} ${sucesso && renderTemplate`<div class="bg-green-500/20 text-green-200 p-4 rounded-xl border border-green-500/50 text-center font-bold flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>${sucesso}</div>`} <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="bg-blue-900/30 p-5 rounded-2xl border border-blue-800/50"> <div class="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 mb-3 text-xl">🧠</div> <h3 class="font-bold text-blue-100 mb-1">Categorização Auto</h3> <p class="text-xs text-blue-300 leading-relaxed">O sistema lê "Uber" e já marca como Transporte. Lê "iFood" e marca Alimentação.</p> </div> <div class="bg-blue-900/30 p-5 rounded-2xl border border-blue-800/50"> <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-3 text-xl">🔒</div> <h3 class="font-bold text-blue-100 mb-1">Anti-Duplicidade</h3> <p class="text-xs text-blue-300 leading-relaxed">Se você importar o mesmo arquivo duas vezes, o sistema ignora o que já foi salvo.</p> </div> <div class="bg-blue-900/30 p-5 rounded-2xl border border-blue-800/50"> <div class="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 mb-3 text-xl">🚀</div> <h3 class="font-bold text-blue-100 mb-1">Agilidade</h3> <p class="text-xs text-blue-300 leading-relaxed">Importe 100 lançamentos em segundos com dados exatos do banco.</p> </div> </div> <div class="bg-gradient-to-br from-blue-600/10 to-blue-900/20 p-8 rounded-3xl border-2 border-dashed border-blue-500/30 text-center hover:border-blue-500/60 transition-all group"> <form method="POST" enctype="multipart/form-data" class="space-y-6"> <div class="space-y-3"> <div class="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"> <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"> <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> </svg> </div> <label class="block cursor-pointer"> <span class="sr-only">Escolher arquivo OFX</span> <input type="file" name="ofx_file" accept=".ofx" required class="block w-full text-sm text-blue-300 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-600 file:text-white file:hover:bg-blue-500 file:transition-colors cursor-pointer text-center mx-auto"> </label> <p class="text-xs text-blue-400/60 pt-2">Extrato Bancário (.ofx)</p> </div> <button type="submit" class="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98] mt-4">Processar Arquivo</button> </form> </div> </main> ` })}`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar-ofx.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar-ofx.astro";
const $$url = "/importar-ofx";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ImportarOfx,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
