import { getAllUsers } from '../../lib/sheets';
import { enviarLembreteSemanal } from '../../lib/email';

export async function GET({ request }) {
    // Verifica senha para ninguém ficar disparando spam
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    if (key !== 'segredo_storm_midia') {
        return new Response(JSON.stringify({ erro: 'Acesso negado' }), { status: 401 });
    }

    try {
        const usuarios = await getAllUsers();
        let enviados = 0;

        // Loop para enviar (em produção massiva, usaríamos fila, mas aqui serve)
        for (const user of usuarios) {
            await enviarLembreteSemanal(user.email, user.name);
            enviados++;
        }

        return new Response(JSON.stringify({ 
            status: 'Sucesso', 
            mensagem: `Lembrete Finance Storm enviado para ${enviados} usuários.` 
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ erro: error.message }), { status: 500 });
    }
}