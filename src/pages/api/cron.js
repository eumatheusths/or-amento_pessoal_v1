export const prerender = false;
import { supabase } from '../../lib/db';

export async function GET() {
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