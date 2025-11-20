// teste-conexao.js
import 'dotenv/config'; // Se der erro aqui, rode: npm install dotenv
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

async function teste() {
  console.log("1. Iniciando teste...");
  console.log("ID Planilha:", process.env.GOOGLE_SHEET_ID);

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    console.log("2. Tentando autenticar e carregar info...");
    await doc.loadInfo();
    
    console.log("3. SUCESSO! Conectado na planilha:", doc.title);
  } catch (e) {
    console.error("ERRO FATAL:", e);
  }
}

teste();