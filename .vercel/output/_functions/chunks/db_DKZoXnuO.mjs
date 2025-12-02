import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gvbdsrvvxavcrhmizxxi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YmRzcnZ2eGF2Y3JobWl6eHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzEwNjYsImV4cCI6MjA4MDIwNzA2Nn0.YKz9M0TGTtRVb29A8uthTopQ-HBJ7Zx1SNeTm9C9JpU";
const supabase = createClient(supabaseUrl, supabaseKey);
async function findUserByEmail(email) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  if (error) return null;
  return data;
}
async function getUserById(id) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}
async function createUser(dados) {
  const { data, error } = await supabase.from("users").insert([{
    name: dados.name,
    email: dados.email,
    password: dados.password,
    salary: dados.salary || 0,
    terms_accepted: true
  }]).select().single();
  if (error) throw new Error(error.message);
  return data;
}
async function getUserTransactions(userId, mes = null, ano = null) {
  let query = supabase.from("transactions").select("*").eq("user_id", userId).order("date", { ascending: false });
  if (mes && ano) {
    const startDate = `${ano}-${String(mes).padStart(2, "0")}-01`;
    const endDate = new Date(ano, mes, 0).toISOString().split("T")[0];
    query = query.gte("date", startDate).lte("date", endDate);
  }
  const { data, error } = await query;
  if (error) return [];
  return data.map((t) => {
    const [year, month, day] = t.date.split("-");
    return {
      ...t,
      date: `${day}/${month}/${year}`,
      amount: Number(t.amount)
    };
  });
}
async function addTransaction(data) {
  const repeat = parseInt(data.repeat || "1");
  const rowsToAdd = [];
  let [ano, mes, dia] = data.date ? data.date.split("-") : (/* @__PURE__ */ new Date()).toISOString().split("T")[0].split("-");
  let dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  for (let i = 0; i < repeat; i++) {
    const y = dataObj.getFullYear();
    const m = String(dataObj.getMonth() + 1).padStart(2, "0");
    const d = String(dataObj.getDate()).padStart(2, "0");
    const dataSQL = `${y}-${m}-${d}`;
    rowsToAdd.push({
      user_id: data.user_id,
      type: data.type,
      amount: data.amount,
      description: i > 0 ? `${data.description} (${i + 1}/${repeat})` : data.description,
      date: dataSQL,
      status: data.status || (data.type === "entrada" ? "recebido" : "pago"),
      category: data.category || "Geral",
      method: data.method || "pix"
    });
    dataObj.setMonth(dataObj.getMonth() + 1);
  }
  const { error } = await supabase.from("transactions").insert(rowsToAdd);
  if (error) console.error("Erro ao adicionar:", error);
}
async function deleteTransaction(id) {
  await supabase.from("transactions").delete().eq("id", id);
}
async function updateTransaction(data) {
  const updateData = {
    description: data.description,
    amount: data.amount,
    type: data.type,
    category: data.category,
    method: data.method,
    status: data.status
  };
  if (data.date) {
    updateData.date = data.date;
  }
  await supabase.from("transactions").update(updateData).eq("id", data.id);
}
async function markAsPaid(id) {
  await supabase.from("transactions").update({ status: "pago" }).eq("id", id);
}
async function getTransactionById(id) {
  const { data } = await supabase.from("transactions").select("*").eq("id", id).single();
  if (!data) return null;
  return data;
}
async function getCategories(userId) {
  return [
    { id: "1", name: "Salário", type: "entrada" },
    { id: "2", name: "Freelance", type: "entrada" },
    { id: "3", name: "Investimentos", type: "entrada" },
    { id: "4", name: "Alimentação", type: "saida" },
    { id: "5", name: "Transporte", type: "saida" },
    { id: "6", name: "Moradia", type: "saida" },
    { id: "7", name: "Lazer", type: "saida" },
    { id: "8", name: "Educação", type: "saida" },
    { id: "9", name: "Saúde", type: "saida" },
    { id: "10", name: "Contas Fixas", type: "saida" },
    { id: "11", name: "Outros", type: "saida" }
  ];
}
async function addCategory(userId, name, type) {
  console.log("Categoria simulada:", name);
  return { id: Math.random().toString(), name, type };
}
async function deleteCategory(id) {
  console.log("Categoria deletada simulada:", id);
}
async function getGoals(userId) {
  const { data } = await supabase.from("goals").select("*").eq("user_id", userId);
  return data || [];
}
async function addGoal(data) {
  await supabase.from("goals").insert([{
    user_id: data.user_id,
    title: data.title,
    target_amount: data.target_amount,
    current_amount: data.current_amount || 0,
    icon: data.icon,
    color: data.color
  }]);
}
async function deleteGoal(id) {
  await supabase.from("goals").delete().eq("id", id);
}
async function updateGoalBalance(goalId, amountToAdd) {
  const { data: meta } = await supabase.from("goals").select("current_amount").eq("id", goalId).single();
  if (meta) {
    const novoValor = (parseFloat(meta.current_amount) || 0) + parseFloat(amountToAdd);
    await supabase.from("goals").update({ current_amount: novoValor }).eq("id", goalId);
  }
}
async function importTransactions(lista) {
  const novas = [];
  for (const t of lista) {
    let dataSQL = t.date;
    if (t.date.includes("/")) {
      const [d, m, y] = t.date.split("/");
      dataSQL = `${y}-${m}-${d}`;
    }
    const hash = `${dataSQL}-${t.amount}-${t.description?.trim()}`;
    const { data: existe } = await supabase.from("transactions").select("id").eq("hash", hash).single();
    if (!existe) {
      novas.push({
        user_id: t.user_id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        date: dataSQL,
        status: "pago",
        category: t.category || "Geral",
        method: t.method || "pix",
        hash
      });
    }
  }
  if (novas.length > 0) {
    const { error } = await supabase.from("transactions").insert(novas);
    if (error) console.error(error);
    return novas.length;
  }
  return 0;
}
async function deleteMonthTransactions(userId, mes, ano) {
  const startDate = `${ano}-${String(mes).padStart(2, "0")}-01`;
  const endDate = new Date(ano, mes, 0).toISOString().split("T")[0];
  const { error } = await supabase.from("transactions").delete().eq("user_id", userId).gte("date", startDate).lte("date", endDate);
  if (error) console.error("Erro ao limpar mês:", error);
}

export { addTransaction as a, addCategory as b, createUser as c, deleteCategory as d, getUserTransactions as e, deleteTransaction as f, getCategories as g, getTransactionById as h, importTransactions as i, deleteMonthTransactions as j, findUserByEmail as k, addGoal as l, updateGoalBalance as m, deleteGoal as n, getGoals as o, markAsPaid as p, getUserById as q, supabase as s, updateTransaction as u };
