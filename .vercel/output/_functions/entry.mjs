import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D5kBJ3Rg.mjs';
import { manifest } from './manifest_DnjMwg2b.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/adicionar.astro.mjs');
const _page2 = () => import('./pages/api/aceitar.astro.mjs');
const _page3 = () => import('./pages/api/cron.astro.mjs');
const _page4 = () => import('./pages/cadastro.astro.mjs');
const _page5 = () => import('./pages/categorias.astro.mjs');
const _page6 = () => import('./pages/dashboard.astro.mjs');
const _page7 = () => import('./pages/deletar.astro.mjs');
const _page8 = () => import('./pages/editar.astro.mjs');
const _page9 = () => import('./pages/importar.astro.mjs');
const _page10 = () => import('./pages/importar-ofx.astro.mjs');
const _page11 = () => import('./pages/investimentos.astro.mjs');
const _page12 = () => import('./pages/limpar-mes.astro.mjs');
const _page13 = () => import('./pages/login.astro.mjs');
const _page14 = () => import('./pages/logout.astro.mjs');
const _page15 = () => import('./pages/metas.astro.mjs');
const _page16 = () => import('./pages/pagar.astro.mjs');
const _page17 = () => import('./pages/recuperar.astro.mjs');
const _page18 = () => import('./pages/relatorio.astro.mjs');
const _page19 = () => import('./pages/termos.astro.mjs');
const _page20 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/adicionar.astro", _page1],
    ["src/pages/api/aceitar.js", _page2],
    ["src/pages/api/cron.js", _page3],
    ["src/pages/cadastro.astro", _page4],
    ["src/pages/categorias.astro", _page5],
    ["src/pages/dashboard.astro", _page6],
    ["src/pages/deletar.astro", _page7],
    ["src/pages/editar.astro", _page8],
    ["src/pages/importar.astro", _page9],
    ["src/pages/importar-ofx.astro", _page10],
    ["src/pages/investimentos.astro", _page11],
    ["src/pages/limpar-mes.astro", _page12],
    ["src/pages/login.astro", _page13],
    ["src/pages/logout.astro", _page14],
    ["src/pages/metas.astro", _page15],
    ["src/pages/pagar.astro", _page16],
    ["src/pages/recuperar.astro", _page17],
    ["src/pages/relatorio.astro", _page18],
    ["src/pages/termos.astro", _page19],
    ["src/pages/index.astro", _page20]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "42b18732-fe12-4e73-aab4-c1ab8855e52c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
