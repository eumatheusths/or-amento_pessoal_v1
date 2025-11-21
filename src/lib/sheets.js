import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { v4 as uuidv4 } from 'uuid';

// --- CONEXÃO ---
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

// --- USUÁRIOS ---
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

export async function createUser(dados) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['users'];
    const rows = await sheet.getRows();
    const existe = rows.find(row => row.get('email') === dados.email);

    if (existe) throw new Error("Este email já está cadastrado.");

    await sheet.addRow({
        id: uuidv4(),
        name: dados.name,
        email: dados.email,
        password: dados.password,
        salary: dados.salary || 0
    });
}

export async function getAllUsers() {
    try {
        const doc = await getDoc();
        const sheet = doc.sheetsByTitle['users'];
        const rows = await sheet.getRows();
        return rows.map(row => ({ name: row.get('name'), email: row.get('email') }));
    } catch (e) { return []; }
}

// --- CATEGORIAS ---
export async function getCategories(userId) {
    try {
        const doc = await getDoc();
        if (!doc.sheetsByTitle['categories']) return [];
        const sheet = doc.sheetsByTitle['categories'];
        const rows = await sheet.getRows();
        
        const padrao = [
            { name: 'Salário', type: 'entrada' }, { name: 'Freelance', type: 'entrada' }, { name: 'Investimentos', type: 'entrada' },
            { name: 'Contas Fixas', type: 'saida' }, { name: 'Alimentação', type: 'saida' }, { name: 'Transporte', type: 'saida' },
            { name: 'Moradia', type: 'saida' }, { name: 'Lazer', type: 'saida' }, { name: 'Educação', type: 'saida' }, { name: 'Outros', type: 'saida' }
        ];

        const custom = rows.filter(r => r.get('user_id') === userId).map(r => ({
            id: r.get('id'), name: r.get('name'), type: r.get('type')
        }));

        return [...padrao, ...custom];
    } catch (e) { return []; }
}

export async function addCategory(userId, name, type) {
    const doc = await getDoc();
    let sheet = doc.sheetsByTitle['categories'];
    if (!sheet) sheet = await doc.addSheet({ title: 'categories', headerValues: ['id', 'user_id', 'name', 'type'] });
    await sheet.addRow({ id: uuidv4(), user_id: userId, name: name, type: type });
}

export async function deleteCategory(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['categories'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) await row.delete();
}

// --- TRANSAÇÕES (COM LÓGICA DE REPETIÇÃO) ---
export async function getUserTransactions(userId, mes = null, ano = null) {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();

    let userRows = rows.filter(row => row.get('user_id') === userId);

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
            category: row.get('category') || 'Geral',
            method: row.get('method') || 'pix',
            hash: row.get('hash')
        };
    });

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

export async function addTransaction(data) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    
    // Lógica de Recorrência
    const repeat = parseInt(data.repeat || '1');
    const rowsToAdd = [];

    let [ano, mes, dia] = data.date ? data.date.split('-') : new Date().toISOString().split('T')[0].split('-');
    // Cria objeto data (mês começa em 0 no JS)
    let dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));

    for (let i = 0; i < repeat; i++) {
        // Formata a data do loop
        const d = String(dataObj.getDate()).padStart(2, '0');
        const m = String(dataObj.getMonth() + 1).padStart(2, '0');
        const y = dataObj.getFullYear();
        const dataFormatada = `${d}/${m}/${y}`;

        // Hash único para evitar duplicação
        const hash = `${y}${m}${d}-${data.amount}-${data.description.trim().toLowerCase().replace(/\s/g, '')}`;

        rowsToAdd.push({
            id: uuidv4(),
            user_id: data.user_id,
            type: data.type,
            amount: data.amount,
            description: i > 0 ? `${data.description} (${i+1}/${repeat})` : data.description,
            date: dataFormatada,
            status: data.status || (data.type === 'entrada' ? 'recebido' : 'pago'),
            category: data.category || 'Geral',
            method: data.method || 'pix',
            hash: hash
        });

        // Avança 1 mês
        dataObj.setMonth(dataObj.getMonth() + 1);
    }

    await sheet.addRows(rowsToAdd);
}

export async function getTransactionById(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (!row) return null;
    const [dia, mes, ano] = row.get('date').split('/');
    return {
        id: row.get('id'), description: row.get('description'), amount: row.get('amount'),
        type: row.get('type'), date: `${ano}-${mes}-${dia}`, category: row.get('category'),
        status: row.get('status'), method: row.get('method') || 'pix'
    };
}

export async function updateTransaction(data) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === data.id);
    if (row) {
        if (data.date) {
            const [ano, mes, dia] = data.date.split('-');
            row.set('date', `${dia}/${mes}/${ano}`);
        }
        row.set('description', data.description);
        row.set('amount', data.amount);
        row.set('type', data.type);
        row.set('category', data.category);
        row.set('method', data.method);
        if (data.status) row.set('status', data.status);
        await row.save();
    }
}

export async function deleteTransaction(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) await row.delete();
}

export async function deleteMonthTransactions(userId, mes, ano) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    
    const rowsToKeep = rows.filter(row => {
        const rowUserId = row.get('user_id');
        const dateStr = row.get('date');
        if (!dateStr) return true;
        const [d, m, y] = dateStr.split('/');
        const isTarget = rowUserId === userId && parseInt(m) === parseInt(mes) && parseInt(y) === parseInt(ano);
        return !isTarget;
    }).map(row => ({
        id: row.get('id'), user_id: row.get('user_id'), type: row.get('type'),
        amount: row.get('amount'), description: row.get('description'), date: row.get('date'),
        status: row.get('status'), category: row.get('category'), method: row.get('method'), hash: row.get('hash')
    }));

    await sheet.clear();
    await sheet.setHeaderRow(['id', 'user_id', 'type', 'amount', 'description', 'date', 'status', 'category', 'method', 'hash']);
    if (rowsToKeep.length > 0) await sheet.addRows(rowsToKeep);
}

export async function markAsPaid(id) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) { row.set('status', 'pago'); await row.save(); }
}

export async function importTransactions(lista) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['transactions'];
    const rows = await sheet.getRows();
    const existingHashes = new Set(rows.map(r => r.get('hash')));
    const novas = [];

    lista.forEach(t => {
        const [dia, mes, ano] = t.date.split('/');
        const hash = `${ano}${mes}${dia}-${t.amount}-${t.description.trim().toLowerCase().replace(/\s/g, '')}`;
        if (!existingHashes.has(hash)) {
            novas.push({
                id: uuidv4(), user_id: t.user_id, type: t.type, amount: t.amount,
                description: t.description, date: t.date, status: 'pago',
                category: t.category, method: t.method || 'pix', hash: hash
            });
            existingHashes.add(hash);
        }
    });

    if (novas.length > 0) { await sheet.addRows(novas); return novas.length; }
    return 0;
}

// --- METAS ---
export async function getGoals(userId) {
    try {
        const doc = await getDoc();
        if (!doc.sheetsByTitle['goals']) return [];
        const sheet = doc.sheetsByTitle['goals'];
        const rows = await sheet.getRows();
        return rows.filter(row => row.get('user_id') === userId).map(row => ({
            id: row.get('id'), title: row.get('title'), target_amount: parseFloat(row.get('target_amount')||0),
            current_amount: parseFloat(row.get('current_amount')||0), icon: row.get('icon'), color: row.get('color')
        }));
    } catch (e) { return []; }
}
export async function addGoal(data) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    await sheet.addRow({ id: uuidv4(), user_id: data.user_id, title: data.title, target_amount: data.target_amount, current_amount: data.current_amount || 0, icon: data.icon || '🎯', color: data.color || 'bg-blue-500' });
}
export async function updateGoalBalance(goalId, amountToAdd) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === goalId);
    if (row) { row.set('current_amount', parseFloat(row.get('current_amount')||0) + parseFloat(amountToAdd)); await row.save(); }
}
export async function deleteGoal(goalId) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['goals'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === goalId);
    if (row) await row.delete();
}

// ... (Mantenha o resto do arquivo igual)

// Função corrigida para ler o aceite de termos
export async function getUserById(id) {
    try {
        const doc = await getDoc();
        const sheet = doc.sheetsByTitle['users'];
        const rows = await sheet.getRows();
        const row = rows.find(r => r.get('id') === id);
        
        if (!row) return null;

        // Pega o valor bruto da célula
        const termsValue = row.get('terms_accepted');
        
        // Verifica se é verdadeiro, independente de maiúscula/minúscula ou espaço
        const aceitou = termsValue && termsValue.toString().toLowerCase().trim() === 'true';

        return {
            id: row.get('id'),
            name: row.get('name'),
            email: row.get('email'),
            terms_accepted: aceitou // Agora retorna true/false corretamente
        };
    } catch (e) {
        console.error(e);
        return null;
    }
}

// NOVA: Salvar o aceite dos termos
export async function acceptTerms(userId) {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle['users'];
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === userId);
    
    if (row) {
        row.set('terms_accepted', 'true'); // Marca como aceito
        await row.save();
    }
}