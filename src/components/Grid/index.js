import React from "react";
import GridItem from "../GridItem";
import * as C from "./styles";
import axios from 'axios'; 

const Grid = ({ itens, setItens }) => {
  const onDelete = async (item) => {
    const route = item.tipo === 'gasto' ? 'gastos' : 'entradas';
    try {
      await axios.delete(`https://a3-engenhariadesoftware.onrender.com/${route}/remover/${item.codigo}`);
      const updatedItems = itens.filter(item => it.codigo !== item.codigo); 
      setItens(updatedItems);
    } catch (error) {
      console.error(`Erro ao deletar ${item}:`, error);
    }
  };

  return (
    <C.Table>
      <C.Thead>
        <C.Tr>
          <C.Th width={40}>Descrição</C.Th>
          <C.Th width={40}>Valor</C.Th>
          <C.Th width={10} alignCenter>
            Tipo
          </C.Th>
          <C.Th width={10}></C.Th>
        </C.Tr>
      </C.Thead>
      <C.Tbody>
        {itens?.map((item, index) => (
          <GridItem key={index} item={item} onDelete={onDelete} />
        ))}
      </C.Tbody>
    </C.Table>
  );
};

export default Grid;
