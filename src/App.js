import React, { useEffect, useState } from "react";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Resume from "./components/Resume";
import Form from "./components/Form";
import Grid from "./components/Grid";
import axios from "axios";

const App = () => {
  const [transactionsList, setTransactionsList] = useState([]);

  // Carrega todas as transações e atualiza o estado
  const fetchData = async () => {
    try {
      const [expenseResponse, incomeResponse] = await Promise.all([
        axios.get("https://a3-engenhariadesoftware.onrender.com/gastos"),
        axios.get("https://a3-engenhariadesoftware.onrender.com/entradas")
      ]);
      
      const expensesWithFlag = expenseResponse.data.map(item => ({ ...item, tipo: 'gasto' }));
      const incomesWithFlag = incomeResponse.data.map(item => ({ ...item, tipo: 'entrada' }));
  
      setTransactionsList([...expensesWithFlag, ...incomesWithFlag]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  // Função para adicionar novas transações
  const handleAddTransaction = async (newTransaction,isExpense) => {
    const route = isExpense ? 'gastos' : 'entradas';
    try {
      const response = await axios.post(`https://a3-engenhariadesoftware.onrender.com/${route}/cadastrar`, newTransaction);
    } catch (error) {
      console.error(`Erro ao adicionar ${newTransaction.tipo}:`, error);
    }
  };
  

    // Cálculo dinâmico de entradas, gastos e total
  const totalIncome = transactionsList
  .filter(item => item.tipo === 'entrada')
  .reduce((acc, item) => acc + parseFloat(item.valor), 0);

  const totalExpense = transactionsList
  .filter(item => item.tipo === 'gasto')
  .reduce((acc, item) => acc + parseFloat(item.valor), 0);

  const total = totalIncome - totalExpense; 


  return (
    <>
      <Header />
      <Resume income={totalIncome.toFixed(2)} expense={Math.abs(totalExpense).toFixed(2)} total={total.toFixed(2)} />
      <Form onAdd={handleAddTransaction} />
      <button onClick={fetchData}>Atualizar Dados</button>
      <Grid itens={transactionsList} setItens={setTransactionsList} />
      <GlobalStyle />
    </>
  );
};

export default App;
