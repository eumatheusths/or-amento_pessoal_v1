import nodemailer from 'nodemailer';

// Configuração Hostinger / Storm Mídia
const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_HOST,
  port: parseInt(import.meta.env.SMTP_PORT || '465'),
  secure: parseInt(import.meta.env.SMTP_PORT) === 465,
  auth: {
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
  },
});

// Estilo Base dos E-mails
const estiloBase = (conteudo) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">⚡ Finance Storm</h1>
    </div>
    <div style="padding: 30px 25px; background-color: #ffffff;">
      ${conteudo}
    </div>
    <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="font-size: 12px; color: #64748b; margin: 0;">
        Enviado por <strong>Finance Storm</strong> • Uma solução <a href="https://stormmidia.com.br" style="color: #2563eb; text-decoration: none; font-weight: bold;">Storm Mídia</a>
      </p>
    </div>
  </div>
`;

export async function enviarSenhaPorEmail(email, nome, senha) {
  try {
    await transporter.sendMail({
      from: `"Finance Storm ⚡" <${import.meta.env.SMTP_USER}>`,
      to: email,
      subject: "Recuperação de Acesso - Finance Storm",
      html: estiloBase(`
        <h2 style="color: #1e293b; margin-top: 0;">Olá, ${nome}!</h2>
        <p style="color: #475569; font-size: 16px;">Esqueceu sua senha? Sem problemas. Aqui está ela:</p>
        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 12px; margin: 25px 0; text-align: center; border: 1px dashed #cbd5e1;">
          <span style="font-size: 24px; font-weight: bold; color: #2563eb; letter-spacing: 2px;">${senha}</span>
        </div>
        <p style="font-size: 14px; color: #94a3b8; text-align: center;">Recomendamos apagar este e-mail após decorar a senha.</p>
      `)
    });
    return true;
  } catch (e) { console.error(e); return false; }
}

export async function enviarBoasVindas(email, nome, senha) {
  try {
    await transporter.sendMail({
      from: `"Finance Storm ⚡" <${import.meta.env.SMTP_USER}>`,
      to: email,
      subject: "Bem-vindo ao Finance Storm! 🚀",
      html: estiloBase(`
        <h2 style="color: #1e293b; margin-top: 0;">Bem-vindo(a) a bordo, ${nome}!</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.5;">
          Estamos muito felizes em ter você no <strong>Finance Storm</strong>. 
          Agora você tem o controle total da sua vida financeira.
        </p>
        
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #2563eb;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Suas Credenciais</p>
          <p style="margin: 5px 0; color: #1e293b;"><strong>Login:</strong> ${email}</p>
          <p style="margin: 5px 0; color: #1e293b;"><strong>Senha:</strong> ${senha}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="https://finance.stormmidia.com.br" style="background-color: #2563eb; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Acessar Plataforma</a>
        </div>
      `)
    });
    return true;
  } catch (e) { console.error(e); return false; }
}

export async function enviarLembreteSemanal(email, nome) {
  try {
    await transporter.sendMail({
      from: `"Finance Storm ⚡" <${import.meta.env.SMTP_USER}>`,
      to: email,
      subject: "Resumo Semanal: Hora de atualizar! ⏳",
      html: estiloBase(`
        <h2 style="color: #1e293b; margin-top: 0;">Oi, ${nome}!</h2>
        <p style="color: #475569; font-size: 16px;">
          Como foi sua semana financeira? Não deixe acumular para não perder o controle.
        </p>
        <p style="color: #475569;">Tire 5 minutinhos hoje para lançar seus gastos e ganhos.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://finance.stormmidia.com.br" style="background-color: #10b981; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Atualizar Meu Painel ➜
          </a>
        </div>
      `)
    });
    return true;
  } catch (e) { console.error(e); return false; }
}