import React, { useState } from "react";
import * as C from "./styles";

const Form = ({ onAdd }) => { 
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [isExpense, setExpense] = useState(false);

  const handleSave = () => {
    if (!desc || !amount || amount < 1) {
      alert("Informe a descrição e o valor positivo!");
      return;
    }

    const getCurrentDate = () => {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const newTransaction = {
      valor: amount,
      motivo: desc,
      data: getCurrentDate(),

    };

    onAdd(newTransaction,isExpense);
    setDesc("");
    setAmount("");
  };

  return (
    <C.Container>
      <C.InputContent>
        <C.Label>Descrição</C.Label>
        <C.Input value={desc} onChange={(e) => setDesc(e.target.value)} />
      </C.InputContent>
      <C.InputContent>
        <C.Label>Valor</C.Label>
        <C.Input
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </C.InputContent>
      <C.RadioGroup>
        <C.Input
          type="radio"
          id="rIncome"
          defaultChecked={!isExpense}
          name="group1"
          onChange={() => setExpense(false)}
        />
        <C.Label htmlFor="rIncome">Entrada</C.Label>
        <C.Input
          type="radio"
          id="rExpenses"
          name="group1"
          onChange={() => setExpense(true)}
        />
        <C.Label htmlFor="rExpenses">Saída</C.Label>
      </C.RadioGroup>
      <C.Button onClick={handleSave}>ADICIONAR</C.Button>
    </C.Container>
  );
};

export default Form;
