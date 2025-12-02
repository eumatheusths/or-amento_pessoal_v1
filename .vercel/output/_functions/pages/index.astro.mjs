/* empty css                                     */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (Astro2.cookies.has("user_session")) {
    return Astro2.redirect("/dashboard");
  }
  return Astro2.redirect("/login");
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/index.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
