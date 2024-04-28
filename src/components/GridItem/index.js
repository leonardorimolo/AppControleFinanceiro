import React from "react";
import * as C from "./styles";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

const GridItem = ({ item, onDelete }) => {
  return (
    <C.Tr>
      <C.Td>{item.motivo}</C.Td>
      <C.Td>{item.valor}</C.Td>
      <C.Td alignCenter>
        {item.tipo === 'gasto' ? (
          <>
            <span style={{ color: 'red' }}>Gasto </span>
            <FaRegArrowAltCircleDown color="red" />
          </>
        ) : (
          <>
            <span style={{ color: 'green' }}>Entrada </span>
            
            <FaRegArrowAltCircleUp color="green" />
          </>
        )}
      </C.Td>
      <C.Td alignCenter>
        <FaTrash onClick={() => onDelete(item)} style={{ cursor: 'pointer' }} />
      </C.Td>
    </C.Tr>
  );
};

export default GridItem;


