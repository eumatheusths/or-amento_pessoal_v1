import { s as supabase } from '../../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function GET() {
  const hoje = new Date().toISOString().split('T')[0];
  
  // Busca no Supabase em vez da planilha
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', 'saida')
    .eq('status', 'pendente')
    .eq('date', hoje);

  if (error) return new Response(JSON.stringify({ error }), { status: 500 });

  return new Response(JSON.stringify({ contas: data }), { status: 200 });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
