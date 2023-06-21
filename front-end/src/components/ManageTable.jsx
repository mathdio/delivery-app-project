import React from 'react';
import PropTypes from 'prop-types';
import { EMAIL_TABLE,
  ITEM_NUMBER,
  NAME_TABLE,
  REMOVE_TABLE,
  ROLE_TABLE,
  ROUTE } from '../dataTestedId/AdminManageIds';

function ManageTable({ users }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ name, email, role }, index) => (
          <tr key={ index }>
            <td data-testid={ `${ROUTE}${ITEM_NUMBER}${index}` }>{index}</td>
            <td data-testid={ `${ROUTE}${NAME_TABLE}${index}` }>{name}</td>
            <td data-testid={ `${ROUTE}${EMAIL_TABLE}${index}` }>{email}</td>
            <td data-testid={ `${ROUTE}${ROLE_TABLE}${index}` }>{role}</td>
            <td data-testid={ `${ROUTE}${REMOVE_TABLE}${index}` }>
              <button
                type="button"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ManageTable.propTypes = {
  users: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
}.isRequired;

export default ManageTable;
