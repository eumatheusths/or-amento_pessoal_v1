/* empty css                                     */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
import { f as deleteTransaction } from '../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Deletar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Deletar;
  const params = Astro2.url.search;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const id = formData.get("id")?.toString();
    if (id) await deleteTransaction(id);
  }
  return Astro2.redirect("/dashboard" + params);
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/deletar.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/deletar.astro";
const $$url = "/deletar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Deletar,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
