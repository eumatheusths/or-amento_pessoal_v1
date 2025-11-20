import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';

async function getDoc() {
  const serviceAccountAuth = new JWT({
    email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(import.meta.env.GOOGLE_SHEET_ID, serviceAccountAuth);
  await doc.loadInfo();
  return doc;
}

export async function findUserByEmail(email) {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['users'];
    const rows = await sheet.getRows();
    const userRow = rows.find(row => row.get('email') === email);
    if (!userRow) return null;
    const userId = userRow.get('id') || userRow.get('id:') || userRow.get('ID');
    return {
      id: userId,
      name: userRow.get('name'),
      email: userRow.get('email'),
      password: userRow.get('password'),
      salary: parseFloat(userRow.get('salary') || 0)
    };
  } catch (error) {
    console.error("Erro findUser:", error);
    return null;
  }
}

export async function getUserTransactions(userId, mes = null, ano = null) {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();

    let userRows = rows.filter(row => row.get('user_id') === userId);

    // Tratamento de dados
    const transacoes = userRows.map(row => {
        const dateStr = row.get('date');
        const [day, month, year] = dateStr.split('/');
        return {
            id: row.get('id'),
            type: row.get('type'),
            amount: parseFloat(row.get('amount')?.replace('R$', '').replace('.', '').replace(',', '.') || 0),
            description: row.get('description'),
            date: dateStr,
            month: parseInt(month),
            year: parseInt(year),
            dateObj: new Date(`${year}-${month}-${day}`),
            status: row.get('status'),
            category: row.get('category') || 'Geral'
        };
    });

    // FILTRO DE MÊS (Se informado)
    if (mes && ano) {
        return transacoes
            .filter(t => t.month === parseInt(mes) && t.year === parseInt(ano))
            .sort((a, b) => b.dateObj - a.dateObj);
    }

    return transacoes.sort((a, b) => b.dateObj - a.dateObj);

  } catch (error) {
    console.error("Erro getTransacoes:", error);
    return [];
  }
}

// --- FUNÇÕES DE TRANSAÇÕES ---
export async function addTransaction(data) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    let dataFormatada = new Date().toLocaleDateString('pt-BR');
    if (data.date) {
        const [ano, mes, dia] = data.date.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }
    let statusFinal = data.status || (data.type === 'entrada' ? 'recebido' : 'pago');

    await sheet.addRow({
        id: uuidv4(),
        user_id: data.user_id,
        type: data.type,
        amount: data.amount,
        description: data.description,
        date: dataFormatada,
        status: statusFinal,
        category: data.category || 'Geral'
    });
}

export async function deleteTransaction(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const rowToDelete = rows.find(row => row.get('id') === id);
    if (rowToDelete) await rowToDelete.delete();
}

export async function markAsPaid(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) {
        row.set('status', 'pago');
        await row.save();
    }
}

export async function importTransactions(lista) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = lista.map(t => ({
        id: uuidv4(),
        user_id: t.user_id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: t.date,
        status: 'pago',
        category: t.category
    }));
    await sheet.addRows(rows);
}

// --- NOVAS FUNÇÕES DE METAS (GOALS) ---
export async function getGoals(userId) {
    try {
        const doc = await getDoc();
        // Cria a aba se não existir (prevenção de erro)
        if (!doc.sheetsByTitle['goals']) {
             const newSheet = await doc.addSheet({ title: 'goals', headerValues: ['id', 'user_id', 'title', 'target_amount', 'current_amount', 'icon', 'color'] });
             return [];
        }

        const sheet = doc.sheetsByTitle['goals'];
        const rows = await sheet.getRows();
        return rows
            .filter(row => row.get('user_id') === userId)
            .map(row => ({
                id: row.get('id'),
                title: row.get('title'),
                target_amount: parseFloat(row.get('target_amount') || 0),
                current_amount: parseFloat(row.get('current_amount') || 0),
                icon: row.get('icon'),
                color: row.get('color')
            }));
    } catch (e) {
        console.error('Erro getGoals', e);
        return [];
    }
}

export async function addGoal(data) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    await sheet.addRow({
        id: uuidv4(),
        user_id: data.user_id,
        title: data.title,
        target_amount: data.target_amount,
        current_amount: data.current_amount || 0,
        icon: data.icon || '🎯',
        color: data.color || 'bg-blue-500'
    });
}

export async function updateGoalBalance(goalId, amountToAdd) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === goalId);
    
    if (row) {
        const atual = parseFloat(row.get('current_amount') || 0);
        const novoValor = atual + parseFloat(amountToAdd);
        row.set('current_amount', novoValor);
        await row.save();
    }
}

export async function deleteGoal(goalId) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === goalId);
    if (row) await row.delete();
}


// ... (Mantenha os imports e a função getDoc) ...

// FUNÇÃO DE LOGIN (Já existia, mas garantindo que está atualizada)
export async function findUserByEmail(email) {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['users'];
    const rows = await sheet.getRows();
    const userRow = rows.find(row => row.get('email') === email);
    
    if (!userRow) return null;
    
    const userId = userRow.get('id') || userRow.get('id:') || userRow.get('ID');

    return {
      id: userId,
      name: userRow.get('name'),
      email: userRow.get('email'),
      password: userRow.get('password'),
      salary: parseFloat(userRow.get('salary') || 0)
    };
  } catch (error) {
    console.error("Erro findUser:", error);
    return null;
  }
}

// NOVA FUNÇÃO: CRIAR USUÁRIO
export async function createUser(dados) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['users'];
    
    // 1. Carrega linhas para verificar duplicidade
    const rows = await sheet.getRows();
    const existe = rows.find(row => row.get('email') === dados.email);

    if (existe) {
        throw new Error("Este email já está cadastrado.");
    }

    // 2. Cria o usuário
    await sheet.addRow({
        id: uuidv4(), // ID único
        name: dados.name,
        email: dados.email,
        password: dados.password, // Em produção real, usaríamos hash (bcrypt)
        salary: dados.salary || 0
    });
}

// ... (Mantenha as outras funções de transações e metas) ...