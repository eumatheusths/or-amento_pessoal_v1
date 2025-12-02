import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// --- FUNÇÕES DE USUÁRIO (MIGRADA DE SHEETS PARA SQL) ---

// Login / Buscar Usuário
export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) return null;
  return data;
}

// Buscar por ID (Usado no Dashboard)
export async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, salary, terms_accepted')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

// Criar Usuário (Cadastro)
export async function createUser(dados) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { 
        name: dados.name, 
        email: dados.email, 
        password: dados.password, // Nota: Idealmente usaríamos bcrypt aqui
        salary: dados.salary || 0 
      }
    ])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

// --- FUNÇÃO EXTRA PARA MIGRAÇÃO (db.js) ---
export async function migrarDados(tabela, dados) {
  // A opção upsert: true atualiza se já existir ou cria se não existir
  const { error } = await supabase.from(tabela).upsert(dados);
  if (error) console.error(`Erro ao migrar ${tabela}:`, error);
}

// --- CATEGORIAS (Adicione isso no final do arquivo) ---

export async function getCategories(userId) {
  // Retorna a lista padrão de categorias
  // (Como não criamos tabela de categorias no SQL, usamos essa lista fixa por enquanto)
  return [
    { id: '1', name: 'Salário', type: 'entrada' },
    { id: '2', name: 'Freelance', type: 'entrada' },
    { id: '3', name: 'Investimentos', type: 'entrada' },
    { id: '4', name: 'Alimentação', type: 'saida' },
    { id: '5', name: 'Transporte', type: 'saida' },
    { id: '6', name: 'Moradia', type: 'saida' },
    { id: '7', name: 'Lazer', type: 'saida' },
    { id: '8', name: 'Educação', type: 'saida' },
    { id: '9', name: 'Saúde', type: 'saida' },
    { id: '10', name: 'Contas Fixas', type: 'saida' },
    { id: '11', name: 'Outros', type: 'saida' }
  ];
}