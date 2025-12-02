/* empty css                                     */
import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_eX9uxKGE.mjs';
import { b as addCategory, d as deleteCategory, g as getCategories } from '../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Categorias = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Categorias;
  if (!Astro2.cookies.has("user_session")) return Astro2.redirect("/login");
  const userId = Astro2.cookies.get("user_session")?.value;
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const action = data.get("action");
    if (action === "create") {
      await addCategory(userId, data.get("name"), data.get("type"));
    } else if (action === "delete") {
      await deleteCategory(data.get("id"));
    }
  }
  const categorias = await getCategories();
  const personalizadas = categorias.filter((c) => c.id);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-6 bg-blue-900/20 border-b border-blue-800/30 flex items-center gap-4"> <a href="/adicionar" class="p-2 bg-blue-900 rounded-lg text-blue-400 hover:bg-blue-800 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> </a> <h1 class="text-xl font-bold text-blue-50">Categorias</h1> </div> <main class="max-w-xl mx-auto px-4 py-8 space-y-8"> <div class="bg-blue-900/30 p-6 rounded-2xl border border-blue-800/50"> <h2 class="text-sm font-bold text-blue-200 uppercase mb-4">Nova Categoria</h2> <form method="POST" class="flex gap-2"> <input type="hidden" name="action" value="create"> <select name="type" class="bg-blue-950 border border-blue-800 text-white rounded-xl px-3 focus:outline-none"> <option value="saida">Despesa</option> <option value="entrada">Receita</option> </select> <input type="text" name="name" required placeholder="Nome (ex: Academia)" class="flex-1 bg-blue-950 border border-blue-800 text-white rounded-xl p-3 focus:border-blue-500 outline-none"> <button class="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-xl font-bold">+</button> </form> </div> <div class="space-y-2"> <h2 class="text-sm font-bold text-blue-200 uppercase mb-2 px-1">Suas Categorias</h2> ${personalizadas.length === 0 && renderTemplate`<p class="text-blue-400/50 text-center py-4">Nenhuma categoria personalizada ainda.</p>`} ${personalizadas.map((cat) => renderTemplate`<div class="flex justify-between items-center bg-blue-900/20 p-4 rounded-xl border border-blue-800/30"> <div class="flex items-center gap-3"> <span${addAttribute(`w-2 h-2 rounded-full ${cat.type === "entrada" ? "bg-green-500" : "bg-red-500"}`, "class")}></span> <span class="text-white font-medium">${cat.name}</span> </div> <form method="POST" onsubmit="return confirm('Apagar categoria?')"> <input type="hidden" name="action" value="delete"> <input type="hidden" name="id"${addAttribute(cat.id, "value")}> <button class="text-red-400 hover:text-red-300 p-2"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> </button> </form> </div>`)} </div> </main> ` })}`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/categorias.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/categorias.astro";
const $$url = "/categorias";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Categorias,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
