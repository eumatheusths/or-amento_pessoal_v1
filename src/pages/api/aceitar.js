export const prerender = false;
import { supabase } from '../../lib/db';

export async function POST({ cookies, redirect }) {
    const userId = cookies.get('user_session')?.value;

    if (!userId) {
        return new Response('Não autorizado', { status: 401 });
    }

    try {
        // Salva na planilha
        await acceptTerms(userId);
        
        // Redireciona de volta para onde estava (ou dashboard)
        return redirect('/dashboard');
    } catch (error) {
        return new Response('Erro ao salvar', { status: 500 });
    }
}