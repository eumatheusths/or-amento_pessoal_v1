/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { h as getTransactionById, u as updateTransaction } from '../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Editar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editar;
  if (!Astro2.cookies.has("user_session")) {
    return Astro2.redirect("/login");
  }
  const id = Astro2.url.searchParams.get("id");
  let transacao = null;
  if (id) {
    transacao = await getTransactionById(id);
  }
  if (!transacao && Astro2.request.method === "GET") {
    return Astro2.redirect("/dashboard");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const dataLancamento = formData.get("date")?.toString();
    const [ano, mes, dia] = dataLancamento.split("-");
    await updateTransaction({
      id: formData.get("id"),
      type: formData.get("type"),
      amount: formData.get("amount"),
      description: formData.get("description"),
      category: formData.get("category"),
      date: formData.get("date"),
      status: formData.get("status"),
      method: formData.get("method")
    });
    return Astro2.redirect(`/dashboard?mes=${parseInt(mes)}&ano=${ano}`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-blue-950 flex flex-col text-blue-50"> <div class="p-4 flex items-center gap-4"> <a href="javascript:history.back()" class="p-2 bg-blue-900 rounded-full hover:bg-blue-800 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> </a> <h1 class="text-xl font-bold">Editar Lançamento</h1> </div> <div class="flex-1 p-6 flex items-center justify-center"> <form method="POST" class="w-full max-w-md space-y-6"> <input type="hidden" name="id"${addAttribute(transacao.id, "value")}> <input type="hidden" name="status"${addAttribute(transacao.status, "value")}> <div class="grid grid-cols-2 gap-4"> <label class="cursor-pointer"> <input type="radio" name="type" value="saida" class="peer hidden"${addAttribute(transacao.type === "saida", "checked")}> <div class="py-4 text-center rounded-xl bg-blue-900 border-2 border-transparent peer-checked:border-red-500 peer-checked:bg-red-500/20 transition-all"> <span class="block text-2xl mb-1">💸</span> <span class="font-bold text-red-300">A Pagar</span> </div> </label> <label class="cursor-pointer"> <input type="radio" name="type" value="entrada" class="peer hidden"${addAttribute(transacao.type === "entrada", "checked")}> <div class="py-4 text-center rounded-xl bg-blue-900 border-2 border-transparent peer-checked:border-green-500 peer-checked:bg-green-500/20 transition-all"> <span class="block text-2xl mb-1">💰</span> <span class="font-bold text-green-300">A Receber</span> </div> </label> </div> <div> <label class="block text-sm text-blue-300 mb-1">Valor (R$)</label> <input type="number" step="0.01" name="amount" required${addAttribute(transacao.amount, "value")} class="w-full bg-blue-900 border border-blue-800 text-white text-3xl font-bold p-4 rounded-xl focus:outline-none focus:border-blue-500 text-center"> </div> <div> <label class="block text-sm text-blue-300 mb-1">Descrição</label> <input type="text" name="description" required${addAttribute(transacao.description, "value")} class="w-full bg-blue-900 border border-blue-800 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500"> </div> <div> <label class="block text-xs text-blue-300 mb-2">Como pagou?</label> <div class="grid grid-cols-2 gap-3"> <label class="cursor-pointer"> <input type="radio" name="method" value="pix" class="peer hidden"${addAttribute(transacao.method !== "credit", "checked")}> <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-900 border border-blue-800 peer-checked:bg-blue-600 peer-checked:border-blue-400 transition-all"> <span class="text-lg">💵</span> <span class="text-sm font-bold">Pix / Débito</span> </div> </label> <label class="cursor-pointer"> <input type="radio" name="method" value="credit" class="peer hidden"${addAttribute(transacao.method === "credit", "checked")}> <div class="flex items-center gap-2 p-3 rounded-xl bg-blue-900 border border-blue-800 peer-checked:bg-purple-600 peer-checked:border-purple-400 transition-all"> <span class="text-lg">💳</span> <span class="text-sm font-bold">Crédito</span> </div> </label> </div> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-sm text-blue-300 mb-1">Categoria</label> <select name="category" class="w-full bg-blue-900 border border-blue-800 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500 appearance-none"> <option${addAttribute(transacao.category, "value")} selected hidden>${transacao.category}</option> <optgroup label="Saídas"> <option value="Contas">📄 Contas Fixas</option> <option value="Alimentação">🍔 Alimentação</option> <option value="Transporte">🚗 Transporte</option> <option value="Lazer">🎉 Lazer</option> <option value="Outros">📦 Outros</option> </optgroup> <optgroup label="Entradas"> <option value="Salário">💰 Salário</option> <option value="Freelance">⚡ Extra</option> </optgroup> </select> </div> <div> <label class="block text-sm text-blue-300 mb-1">Data</label> <input type="date" name="date" required${addAttribute(transacao.date, "value")} class="w-full bg-blue-900 border border-blue-800 text-white p-4 rounded-xl focus:outline-none focus:border-blue-500"> </div> </div> <button type="submit" class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 mt-4 transition-transform active:scale-95">
Salvar Alterações
</button> </form> </div> </div> ` })}`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/editar.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/editar.astro";
const $$url = "/editar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Editar,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
