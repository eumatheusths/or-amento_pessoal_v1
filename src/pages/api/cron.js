import { getAllUsers } from '../../lib/sheets';
import { enviarLembreteSemanal } from '../../lib/email';

export async function GET({ request }) {
    const url = new URL(request.url);
    const key = url.searchParams.get('key');

    // Segurança simples
    if (key !== 'segredo_storm_midia') {
        return new Response(JSON.stringify({ erro: 'Senha incorreta' }), { status: 401 });
    }

    try {
        // 1. Busca usuários no banco
        const usuarios = await getAllUsers();
        
        if (!usuarios || usuarios.length === 0) {
             return new Response(JSON.stringify({ mensagem: 'Nenhum usuário encontrado para enviar.' }), { status: 200 });
        }

        let enviados = 0;
        const erros = [];

        // 2. Loop com AWAIT (Crucial para Vercel não matar o processo)
        for (const user of usuarios) {
            if (user.email && user.email.includes('@')) {
                try {
                    console.log(`Tentando enviar para: ${user.email}`);
                    const enviou = await enviarLembreteSemanal(user.email, user.name || 'Usuário');
                    
                    if (enviou) {
                        enviados++;
                    } else {
                        erros.push(`Falha técnica ao enviar para ${user.email}`);
                    }
                } catch (err) {
                    console.error(`Erro no envio para ${user.email}:`, err);
                    erros.push(`Erro no envio para ${user.email}: ${err.message}`);
                }
            }
        }

        // 3. Resposta final
        return new Response(JSON.stringify({ 
            status: 'Concluído', 
            enviados: enviados,
            total_usuarios: usuarios.length,
            erros: erros
        }), { status: 200 });

    } catch (error) {
        console.error("Erro geral no Cron:", error);
        return new Response(JSON.stringify({ erro: error.message }), { status: 500 });
    }
}
