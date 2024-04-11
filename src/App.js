import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import Grid from "./components/Grid";
import axios from "axios";

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  // Função para carregar os gastos
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("https://a3-engenhariadesoftware.onrender.com/gastos");
      const expenseData = response.data;
      const totalExpense = expenseData
        .filter((transaction) => transaction.valor > 0)
        .reduce((total, transaction) => total + parseFloat(transaction.valor), 0);
      setExpense(totalExpense.toFixed(2));
      setTransactionsList(expenseData);
    } catch (error) {
      console.error("Erro ao buscar gastos:", error);
    }
  };

  // Função para carregar as entradas
  const fetchIncomes = async () => {
    try {
      const response = await axios.get("https://a3-engenhariadesoftware.onrender.com/entradas");
      const incomeData = response.data;
      const totalIncome = incomeData
        .filter((transaction) => transaction.valor > 0)
        .reduce((total, transaction) => total + parseFloat(transaction.valor), 0);
      setIncome(totalIncome.toFixed(2));
      setTransactionsList(incomeData);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    }
  };

 useEffect(() => {
  const parseTotal = async () => {
    try {
      await fetchData();
      const total = parseFloat(income) - parseFloat(expense);
      setTotal(total.toFixed(2));
      console.log("Total atualizado:", total.toFixed(2));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchData = async () => {
    try {
      fetchIncomes();
      fetchExpenses();
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  parseTotal();
}, [income, expense]); // Adicionamos income e expense como dependências

  

  const handleAddTransaction = async (newTransaction) => {
    try {
      const response = await axios.post("/gastos", newTransaction);
      setTransactionsList([...transactionsList, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar gasto:", error);
    }
  };

  return (
    <>
      <Header />
      <Resume income={income} expense={expense} total={total} />
      <Form onAdd={handleAddTransaction} />
      <button onClick={fetchExpenses}>Gastos</button>
      <button onClick={fetchIncomes}>Entradas</button>
      <Grid itens={transactionsList} setItens={setTransactionsList} />
      <GlobalStyle />
    </>
  );
};

export default App;
