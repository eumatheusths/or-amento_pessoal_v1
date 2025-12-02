import { e as createComponent, f as createAstro, r as renderTemplate, h as addAttribute, p as renderSlot, l as renderHead } from './astro/server_DmKDn6jN.mjs';
import 'piccolore';
import 'clsx';
/* empty css                             */
import { q as getUserById } from './db_DKZoXnuO.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const currentPath = Astro2.url.pathname;
  const isTermsPage = currentPath === "/termos";
  const activeClass = (path) => currentPath === path ? "text-blue-600 dark:text-blue-400 scale-110 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" : "text-slate-400 dark:text-blue-400/40 hover:text-blue-500 dark:hover:text-blue-300";
  let showTermsModal = false;
  const userId = Astro2.cookies.get("user_session")?.value;
  if (userId && !isTermsPage) {
    const user = await getUserById(userId);
    if (user && !user.terms_accepted) {
      showTermsModal = true;
    }
  }
  return renderTemplate(_a || (_a = __template(['<html lang="pt-br" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>Finance Storm \u26A1</title><script>\n            if (localStorage.getItem('theme') === 'light') {\n                document.documentElement.classList.remove('dark');\n            } else {\n                document.documentElement.classList.add('dark');\n            }\n        <\/script>", '</head> <body class="bg-slate-50 dark:bg-blue-950 text-slate-900 dark:text-blue-50 selection:bg-blue-500 selection:text-white transition-colors duration-300"> ', ' <div class="pb-32 min-h-screen flex flex-col"> <div class="flex-1">', '</div> <footer class="text-center py-8 mt-8 border-t border-slate-200 dark:border-blue-900/50"> <p class="text-xs text-slate-400 dark:text-blue-400/60 mb-1">Finance Storm \u2022 Gest\xE3o Inteligente</p> <a href="https://stormmidia.com.br/" target="_blank" class="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-300 hover:opacity-80 transition-colors group"> <span>\u26A1 Uma solu\xE7\xE3o Storm M\xEDdia</span> </a> </footer> </div> <div id="mobile-menu" class="fixed bottom-24 right-4 bg-white/95 dark:bg-blue-900/95 backdrop-blur-xl border border-slate-200 dark:border-blue-700/50 rounded-2xl shadow-2xl p-2 flex-col gap-1 w-52 transform transition-all duration-200 origin-bottom-right scale-0 opacity-0 z-50 hidden"> <button id="theme-toggle" class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white text-left"> <span class="text-xl dark:hidden">\u{1F31E}</span> <span class="text-xl hidden dark:inline">\u{1F319}</span> <span class="font-medium text-sm">Trocar Tema</span> </button> <div class="h-px bg-slate-200 dark:bg-blue-700/50 my-1"></div> <a href="/investimentos" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white"><span class="text-xl">\u{1F4C8}</span><span class="font-medium text-sm">Investimentos</span></a> <a href="/metas" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white"><span class="text-xl">\u{1F3C6}</span><span class="font-medium text-sm">Metas</span></a> <div class="h-px bg-slate-200 dark:bg-blue-700/50 my-1"></div> <a href="/importar" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white"><span class="text-xl">\u{1F4C4}</span><span class="font-medium text-sm">Importar CSV</span></a> <a href="/importar-ofx" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white"><span class="text-xl">\u{1F3E6}</span><span class="font-medium text-sm">Importar OFX</span></a> <a href="/termos" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-blue-800/50 transition-colors text-slate-700 dark:text-blue-200 hover:text-blue-600 dark:hover:text-white"><span class="text-xl">\u2696\uFE0F</span><span class="font-medium text-sm">Termos de Uso</span></a> </div> <nav class="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-blue-950/90 backdrop-blur-md border-t border-slate-200 dark:border-blue-800/50 pb-safe z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors duration-300"> <div class="max-w-lg mx-auto px-6 h-20 flex justify-between items-center"> <a href="/dashboard"', '><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg><span class="text-[10px] font-medium">In\xEDcio</span></a> <a href="/relatorio"', `><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg><span class="text-[10px] font-medium">Relat\xF3rio</span></a> <div class="relative -top-6 px-2"><a href="/adicionar" class="w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 text-white transition-transform hover:scale-110 active:scale-95 ring-4 ring-slate-50 dark:ring-blue-950"><svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg></a></div> <button id="menu-btn" class="flex flex-col items-center gap-1 transition-all duration-300 text-slate-400 dark:text-blue-400/40 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg><span class="text-[10px] font-medium">Menu</span></button> <a href="/logout" class="flex flex-col items-center gap-1 transition-all duration-300 text-slate-400 dark:text-blue-400/40 hover:text-red-500 dark:hover:text-red-400"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg><span class="text-[10px] font-medium">Sair</span></a> </div> </nav> <script>
            const btn = document.getElementById('menu-btn');
            const menu = document.getElementById('mobile-menu');
            let isOpen = false;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                isOpen = !isOpen;
                if (isOpen) {
                    menu.classList.remove('hidden');
                    setTimeout(() => { menu.classList.remove('scale-0', 'opacity-0'); menu.classList.add('scale-100', 'opacity-100'); }, 10);
                } else {
                    menu.classList.remove('scale-100', 'opacity-100'); menu.classList.add('scale-0', 'opacity-0');
                    setTimeout(() => menu.classList.add('hidden'), 200);
                }
            });
            document.addEventListener('click', (e) => {
                if (isOpen && !menu.contains(e.target) && !btn.contains(e.target)) {
                    isOpen = false;
                    menu.classList.remove('scale-100', 'opacity-100'); menu.classList.add('scale-0', 'opacity-0');
                    setTimeout(() => menu.classList.add('hidden'), 200);
                }
            });
            const themeBtn = document.getElementById('theme-toggle');
            themeBtn.addEventListener('click', () => {
                const html = document.documentElement;
                if (html.classList.contains('dark')) { html.classList.remove('dark'); localStorage.setItem('theme', 'light'); } 
                else { html.classList.add('dark'); localStorage.setItem('theme', 'dark'); }
            });
        <\/script> </body> </html>`])), addAttribute(Astro2.generator, "content"), renderHead(), showTermsModal && renderTemplate`<div id="terms-modal" class="fixed inset-0 z-[999] bg-blue-950/95 backdrop-blur-md flex items-center justify-center p-4"> <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"> <div class="p-6 border-b border-slate-200 dark:border-blue-800 bg-slate-50 dark:bg-blue-950/50"> <h2 class="text-2xl font-bold text-blue-600 dark:text-white mb-1">Bem-vindo ao Finance Storm ⚡</h2> <p class="text-sm text-slate-500 dark:text-blue-300">Para sua segurança, aceite os termos para continuar.</p> </div> <div class="p-6 overflow-y-auto text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed"> <p><strong>1. Dados e LGPD:</strong> Seus lançamentos são seus. Usamos seus dados apenas para fornecer o serviço e não os vendemos para terceiros.</p> <p><strong>2. Segurança:</strong> Suas informações são armazenadas de forma segura. Recomendamos não compartilhar sua senha.</p> <p><strong>3. Concordância:</strong> Ao clicar abaixo, você confirma que leu e concorda com nossas políticas de uso.</p> <p class="text-xs bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
Ao aceitar, essa mensagem não aparecerá mais para sua conta.
</p> </div> <div class="p-6 border-t border-slate-200 dark:border-blue-800 bg-slate-50 dark:bg-blue-950/50"> <form action="/api/aceitar" method="POST"> <button type="submit" class="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-transform active:scale-95 flex items-center justify-center gap-2"> <span>Li e Aceito os Termos</span> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> </button> </form> </div> </div> </div>`, renderSlot($$result, $$slots["default"]), addAttribute(`flex flex-col items-center gap-1 transition-all duration-300 ${activeClass("/dashboard")}`, "class"), addAttribute(`flex flex-col items-center gap-1 transition-all duration-300 ${activeClass("/relatorio")}`, "class"));
}, "C:/Users/Matheus/or-amento_pessoal_v1/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
