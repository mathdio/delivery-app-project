import React from 'react';
import Header from '../components/Header';
import { EMAIL,
  NAME,
  PASSWORD,
  REGISTER,
  ROLE,
  ROUTE } from '../dataTestedId/AdminManageIds';

function AdminManage() {
  return (
    <div>
      <Header />
      <main>
        <form>
          <input
            type="text"
            id="name"
            name="name"
            data-testid={ `${ROUTE}${NAME}` }
          />
          <input
            type="email"
            id="email"
            name="email"
            data-testid={ `${ROUTE}${EMAIL}` }
          />
          <input
            type="password"
            id="password"
            name="password"
            data-testid={ `${ROUTE}${PASSWORD}` }
          />
          <select
            data-testid={ `${ROUTE}${ROLE}` }
            id="select-type"
          >
            <option>Selecione um vendedor</option>
          </select>
          <button
            type="button"
            data-testid={ `${ROUTE}${REGISTER}` }
          >
            CADASTRAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default AdminManage;
