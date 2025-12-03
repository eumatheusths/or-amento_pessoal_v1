import 'piccolore';
import { q as decodeKey } from './chunks/astro/server_DmKDn6jN.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bf4CsP3z.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Matheus/or-amento_pessoal_v1/","cacheDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/node_modules/.astro/","outDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/dist/","srcDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/src/","publicDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/public/","buildClientDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/dist/client/","buildServerDir":"file:///C:/Users/Matheus/or-amento_pessoal_v1/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/adicionar","isIndex":false,"type":"page","pattern":"^\\/adicionar\\/?$","segments":[[{"content":"adicionar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/adicionar.astro","pathname":"/adicionar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/aceitar","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/aceitar\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"aceitar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/aceitar.js","pathname":"/api/aceitar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/cron","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/cron\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"cron","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/cron.js","pathname":"/api/cron","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/cadastro","isIndex":false,"type":"page","pattern":"^\\/cadastro\\/?$","segments":[[{"content":"cadastro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/cadastro.astro","pathname":"/cadastro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/categorias","isIndex":false,"type":"page","pattern":"^\\/categorias\\/?$","segments":[[{"content":"categorias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categorias.astro","pathname":"/categorias","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/deletar","isIndex":false,"type":"page","pattern":"^\\/deletar\\/?$","segments":[[{"content":"deletar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/deletar.astro","pathname":"/deletar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/editar","isIndex":false,"type":"page","pattern":"^\\/editar\\/?$","segments":[[{"content":"editar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/editar.astro","pathname":"/editar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/importar","isIndex":false,"type":"page","pattern":"^\\/importar\\/?$","segments":[[{"content":"importar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/importar.astro","pathname":"/importar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/importar-ofx","isIndex":false,"type":"page","pattern":"^\\/importar-ofx\\/?$","segments":[[{"content":"importar-ofx","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/importar-ofx.astro","pathname":"/importar-ofx","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"},{"type":"inline","content":".scrollbar-hide[data-astro-cid-kfg7a7qd]::-webkit-scrollbar{display:none}.scrollbar-hide[data-astro-cid-kfg7a7qd]{-ms-overflow-style:none;scrollbar-width:none}\n"}],"routeData":{"route":"/investimentos","isIndex":false,"type":"page","pattern":"^\\/investimentos\\/?$","segments":[[{"content":"investimentos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/investimentos.astro","pathname":"/investimentos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/limpar-mes","isIndex":false,"type":"page","pattern":"^\\/limpar-mes\\/?$","segments":[[{"content":"limpar-mes","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/limpar-mes.astro","pathname":"/limpar-mes","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/logout","isIndex":false,"type":"page","pattern":"^\\/logout\\/?$","segments":[[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logout.astro","pathname":"/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/metas","isIndex":false,"type":"page","pattern":"^\\/metas\\/?$","segments":[[{"content":"metas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/metas.astro","pathname":"/metas","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/pagar","isIndex":false,"type":"page","pattern":"^\\/pagar\\/?$","segments":[[{"content":"pagar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pagar.astro","pathname":"/pagar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/recuperar","isIndex":false,"type":"page","pattern":"^\\/recuperar\\/?$","segments":[[{"content":"recuperar","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recuperar.astro","pathname":"/recuperar","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/relatorio","isIndex":false,"type":"page","pattern":"^\\/relatorio\\/?$","segments":[[{"content":"relatorio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/relatorio.astro","pathname":"/relatorio","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/termos","isIndex":false,"type":"page","pattern":"^\\/termos\\/?$","segments":[[{"content":"termos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/termos.astro","pathname":"/termos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/adicionar.huzWSb4Q.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/cadastro.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/recuperar.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/adicionar.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/categorias.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/editar.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar-ofx.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/importar.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/investimentos.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/metas.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/relatorio.astro",{"propagation":"none","containsHead":true}],["C:/Users/Matheus/or-amento_pessoal_v1/src/pages/termos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/adicionar@_@astro":"pages/adicionar.astro.mjs","\u0000@astro-page:src/pages/api/aceitar@_@js":"pages/api/aceitar.astro.mjs","\u0000@astro-page:src/pages/api/cron@_@js":"pages/api/cron.astro.mjs","\u0000@astro-page:src/pages/cadastro@_@astro":"pages/cadastro.astro.mjs","\u0000@astro-page:src/pages/categorias@_@astro":"pages/categorias.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/deletar@_@astro":"pages/deletar.astro.mjs","\u0000@astro-page:src/pages/editar@_@astro":"pages/editar.astro.mjs","\u0000@astro-page:src/pages/importar@_@astro":"pages/importar.astro.mjs","\u0000@astro-page:src/pages/importar-ofx@_@astro":"pages/importar-ofx.astro.mjs","\u0000@astro-page:src/pages/investimentos@_@astro":"pages/investimentos.astro.mjs","\u0000@astro-page:src/pages/limpar-mes@_@astro":"pages/limpar-mes.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/logout@_@astro":"pages/logout.astro.mjs","\u0000@astro-page:src/pages/metas@_@astro":"pages/metas.astro.mjs","\u0000@astro-page:src/pages/pagar@_@astro":"pages/pagar.astro.mjs","\u0000@astro-page:src/pages/recuperar@_@astro":"pages/recuperar.astro.mjs","\u0000@astro-page:src/pages/relatorio@_@astro":"pages/relatorio.astro.mjs","\u0000@astro-page:src/pages/termos@_@astro":"pages/termos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CsOfoqpK.mjs","C:/Users/Matheus/or-amento_pessoal_v1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_33jhC__f.mjs","C:/Users/Matheus/or-amento_pessoal_v1/src/pages/dashboard.astro?astro&type=script&index=0&lang.ts":"_astro/dashboard.astro_astro_type_script_index_0_lang.Ds9P6cqp.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/adicionar.huzWSb4Q.css","/favicon.svg","/_astro/dashboard.astro_astro_type_script_index_0_lang.Ds9P6cqp.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"G5sTfe/ykwDN75paZ3lEzhhsN+PEMCOrJoFb+IDhTQI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
