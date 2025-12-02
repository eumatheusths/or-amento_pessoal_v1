/* empty css                                     */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete("user_session", { path: "/" });
  return Astro2.redirect("/login");
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/logout.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/logout.astro";
const $$url = "/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
