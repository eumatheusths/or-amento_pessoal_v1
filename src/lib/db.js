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