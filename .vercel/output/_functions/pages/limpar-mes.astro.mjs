/* empty css                                     */
import { e as createComponent, f as createAstro } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
import { j as deleteMonthTransactions } from '../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$LimparMes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LimparMes;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const userId = Astro2.cookies.get("user_session")?.value;
    const mes = formData.get("mes");
    const ano = formData.get("ano");
    if (userId && mes && ano) {
      await deleteMonthTransactions(userId, mes, ano);
    }
    return Astro2.redirect(`/dashboard?mes=${mes}&ano=${ano}`);
  }
  return Astro2.redirect("/dashboard");
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/limpar-mes.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/limpar-mes.astro";
const $$url = "/limpar-mes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$LimparMes,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
