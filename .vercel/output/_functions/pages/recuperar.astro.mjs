/* empty css                                     */
import { e as createComponent, f as createAstro, l as renderHead, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
import { k as findUserByEmail } from '../chunks/db_DKZoXnuO.mjs';
import { a as enviarSenhaPorEmail } from '../chunks/email_C_wyqi8m.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Recuperar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Recuperar;
  let mensagem = "";
  let tipoMensagem = "";
  if (Astro2.request.method === "POST") {
    const data = await Astro2.request.formData();
    const email = data.get("email")?.toString();
    if (!email) {
      mensagem = "Por favor, digite seu e-mail.";
      tipoMensagem = "erro";
    } else {
      const user = await findUserByEmail(email);
      if (user) {
        const enviou = await enviarSenhaPorEmail(user.email, user.name, user.password);
        if (enviou) {
          mensagem = `E-mail enviado! Verifique sua caixa de entrada (e o Spam) de ${email}.`;
          tipoMensagem = "sucesso";
        } else {
          mensagem = "Erro t\xE9cnico ao enviar o e-mail. Tente novamente mais tarde.";
          tipoMensagem = "erro";
        }
      } else {
        mensagem = "Este e-mail n\xE3o est\xE1 cadastrado no sistema.";
        tipoMensagem = "erro";
      }
    }
  }
  return renderTemplate`<html lang="pt-br"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Recuperar Senha</title><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead()}</head> <body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden"> <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10"> <div class="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px]"></div> </div> <div class="w-full max-w-sm bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"> <div class="text-center mb-8"> <div class="inline-block p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl mb-4 shadow-lg text-3xl">
🔑
</div> <h1 class="text-xl font-bold">Esqueceu a senha?</h1> <p class="text-blue-200/60 text-sm mt-2">Sem problemas. Digite seu e-mail abaixo.</p> </div> ${mensagem && renderTemplate`<div${addAttribute(`p-4 rounded-xl text-sm mb-6 text-center border ${tipoMensagem === "sucesso" ? "bg-green-500/20 border-green-500/50 text-green-200 font-bold" : "bg-red-500/20 border-red-500/50 text-red-200"}`, "class")}> ${mensagem} </div>`} <form method="POST" class="space-y-5"> <div> <label class="block text-xs text-blue-200 mb-1 ml-1">E-mail cadastrado</label> <input type="email" name="email" required placeholder="seu@email.com" class="w-full bg-slate-950/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"> </div> <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-transform active:scale-[0.98]">
Recuperar Senha
</button> </form> <div class="mt-6 text-center"> <a href="/login" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 group"> <span class="group-hover:-translate-x-1 transition-transform">←</span> Voltar para o Login
</a> </div> </div> </body></html>`;
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/recuperar.astro", void 0);

const $$file = "C:/Users/Matheus/or-amento_pessoal_v1/src/pages/recuperar.astro";
const $$url = "/recuperar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Recuperar,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
