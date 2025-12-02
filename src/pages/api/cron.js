export const prerender = false;
import { supabase } from '../../lib/db'; // Agora usa o banco novo

export async function GET() {
  // Busca contas pendentes que vencem hoje
  const hoje = new Date().toISOString().split('T')[0];
  
  const { data: contas, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', 'saida')
    .eq('status', 'pendente')
    .eq('date', hoje);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Aqui você colocaria a lógica de envio de e-mail se tiver
  // Por enquanto, apenas retorna quem vence hoje
  return new Response(JSON.stringify({
    message: 'Cron executado com sucesso',
    contasVencendoHoje: contas
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}