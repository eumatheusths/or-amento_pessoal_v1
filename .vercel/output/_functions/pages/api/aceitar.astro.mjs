import '../../chunks/db_DKZoXnuO.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;

async function POST({ cookies, redirect }) {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
