import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GastosComponent = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await axios.get('https://a3-engenhariadesoftware.onrender.com/gastos');
        setGastos(response.data);
      } catch (error) {
        console.error('Erro ao buscar gastos:', error);
      }
    };

    fetchGastos();
  }, []);

  return (
    <div>
      <h1>Lista de Gastos</h1>
      <ul>
        {gastos.map((gasto) => (
          <li key={gasto.codigo}>
            <p>Descrição: {gasto.descricao}</p>
            <p>Valor: R$ {gasto.valor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GastosComponent;
