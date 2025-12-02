/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { g as getCategories, a as addTransaction } from '../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Adicionar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Adicionar;
  if (!Astro2.cookies.has("user_session")) return Astro2.redirect("/login");
  const userId = Astro2.cookies.get("user_session")?.value;
  const categorias = await getCategories();
  const catsEntrada = categorias.filter((c) => c.type === "entrada");
  const catsSaida = categorias.filter((c) => c.type === "saida");
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const isPending = formData.get("is_pending") === "on";
    const dataLancamento = formData.get("date")?.toString();
    const [ano, mes, dia] = dataLancamento.split("-");
    await addTransaction({
      user_id: userId,
      type: formData.get("type"),
      amount: formData.get("amount"),
      description: formData.get("description"),
      category: formData.get("category"),
      date: dataLancamento,
      status: isPending ? "pendente" : "pago",
      method: formData.get("method"),
      repeat: formData.get("repeat")
      // Recorrência
    });
    return Astro2.redirect(`/dashboard?mes=${parseInt(mes)}&ano=${ano}`);
  }
  const hoje = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="min-h-screen bg-blue-950 flex flex-col text-blue-50"> <div class="p-4 flex items-center gap-4"> <a href="javascript:history.back()" class="p-2 bg-blue-900 rounded-full hover:bg-blue-800"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> </a> <h1 class="text-xl font-bold">Lan\xE7ar</h1> </div> <div class="flex-1 p-6 flex items-center justify-center"> <form method="POST" class="w-full max-w-md space-y-5"> <div class="grid grid-cols-2 gap-4"> <label class="cursor-pointer"> <input type="radio" name="type" value="saida" class="peer hidden" checked onclick="toggleCats('saida')"> <div class="py-3 text-center rounded-xl bg-blue-900 border-2 border-transparent peer-checked:border-red-500 peer-checked:bg-red-500/20 transition-all"> <span class="block text-xl mb-1">\u{1F4B8}</span> <span class="font-bold text-sm text-red-300">Despesa</span> </div> </label> <label class="cursor-pointer"> <input type="radio" name="type" value="entrada" class="peer hidden" onclick="toggleCats('entrada')"> <div class="py-3 text-center rounded-xl bg-blue-900 border-2 border-transparent peer-checked:border-green-500 peer-checked:bg-green-500/20 transition-all"> <span class="block text-xl mb-1">\u{1F4B0}</span> <span class="font-bold text-sm text-green-300">Receita</span> </div> </label> </div> <div> <label class="block text-xs text-blue-300 mb-1">Valor (R$)</label> <input type="number" step="0.01" name="amount" required placeholder="0,00" class="w-full bg-blue-900 border border-blue-800 text-white text-4xl font-bold p-4 rounded-xl focus:outline-none focus:border-blue-500 text-center placeholder-blue-800"> </div> <div> <label class="block text-xs text-blue-300 mb-1">Descri\xE7\xE3o</label> <input type="text" name="description" required placeholder="Ex: Aluguel, Sal\xE1rio..." class="w-full bg-blue-900 border border-blue-800 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500"> </div> <div class="grid grid-cols-2 gap-3"> <label class="cursor-pointer"> <input type="radio" name="method" value="pix" class="peer hidden" checked> <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-900 border border-blue-800 peer-checked:bg-blue-600 peer-checked:border-blue-400 transition-all"> <span class="text-lg">\u{1F4B5}</span><span class="text-sm font-bold">Pix / D\xE9bito</span> </div> </label> <label class="cursor-pointer"> <input type="radio" name="method" value="credit" class="peer hidden"> <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-900 border border-blue-800 peer-checked:bg-purple-600 peer-checked:border-purple-400 transition-all"> <span class="text-lg">\u{1F4B3}</span><span class="text-sm font-bold">Cr\xE9dito</span> </div> </label> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-xs text-blue-300 mb-1">Categoria</label> <div class="relative"> <select name="category" id="cat-select" class="w-full bg-blue-900 border border-blue-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm appearance-none"> <optgroup label="Sa\xEDdas" id="opt-saida"> `, ' </optgroup> <optgroup label="Entradas" id="opt-entrada" style="display:none"> ', ' </optgroup> </select> <a href="/categorias" class="absolute -bottom-5 right-0 text-[10px] text-blue-400 hover:text-white">+ Criar nova</a> </div> </div> <div> <label class="block text-xs text-blue-300 mb-1">Data</label> <input type="date" name="date"', ` required class="w-full bg-blue-900 border border-blue-800 text-white p-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm"> </div> </div> <div class="bg-blue-900/30 p-4 rounded-xl border border-blue-800/50 space-y-3"> <label class="flex items-center justify-between cursor-pointer"> <span class="text-sm text-blue-200">Repetir este lan\xE7amento?</span> <select name="repeat" class="bg-blue-950 border border-blue-700 text-white text-xs p-1 rounded focus:outline-none"> <option value="1">N\xE3o repetir</option> <option value="2">2x (Meses)</option> <option value="3">3x (Meses)</option> <option value="6">6x (Meses)</option> <option value="12">12x (Anual)</option> <option value="24">24x (2 Anos)</option> </select> </label> <label class="flex items-center gap-3 cursor-pointer pt-2 border-t border-blue-800/30"> <div class="relative flex items-center"> <input type="checkbox" name="is_pending" class="peer h-5 w-5 rounded border-gray-500 text-blue-600 focus:ring-blue-500 bg-blue-900"> </div> <span class="text-sm text-blue-200">Deixar como Pendente (Agendar)</span> </label> </div> <button type="submit" class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 mt-2 active:scale-95 transition-transform">
Salvar Lan\xE7amento
</button> </form> </div> </div> <script>
        // Script para trocar as categorias dependendo do tipo (Entrada/Sa\xEDda)
        function toggleCats(type) {
            const optSaida = document.getElementById('opt-saida');
            const optEntrada = document.getElementById('opt-entrada');
            const select = document.getElementById('cat-select');
            
            if (type === 'saida') {
                optSaida.style.display = 'block';
                optEntrada.style.display = 'none';
                select.value = optSaida.firstElementChild?.value || '';
            } else {
                optSaida.style.display = 'none';
                optEntrada.style.display = 'block';
                select.value = optEntrada.firstElementChild?.value || '';
            }
        }
    <\/script> `])), maybeRenderHead(), catsSaida.map((c) => renderTemplate`<option${addAttribute(c.name, "value")}>${c.name}</option>`), catsEntrada.map((c) => renderTemplate`<option${addAttribute(c.name, "value")}>${c.name}</option>`), addAttribute(hoje, "value")) })}`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/adicionar.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/adicionar.astro";
const $$url = "/adicionar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Adicionar,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
