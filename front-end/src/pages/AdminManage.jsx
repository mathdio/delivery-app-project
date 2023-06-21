import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { EMAIL,
  NAME,
  PASSWORD,
  REGISTER,
  ROLE,
  ROUTE } from '../dataTestedId/AdminManageIds';

function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState();
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    document.title = 'Manager Area- Delivery App';
  }, []);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMin = 6;
    const nameMin = 12;
    if (regex.test(email)
    && name.length >= nameMin
    && password.length >= passwordMin
    && role) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name, email, password, role]);

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
            value={ name }
            onChange={ ({ target }) => { setName(target.value); } }
          />
          <input
            type="email"
            id="email"
            name="email"
            data-testid={ `${ROUTE}${EMAIL}` }
            value={ email }
            onChange={ ({ target }) => { setEmail(target.value); } }
          />
          <input
            type="password"
            id="password"
            name="password"
            data-testid={ `${ROUTE}${PASSWORD}` }
            value={ password }
            onChange={ ({ target }) => { setPassword(target.value); } }
          />
          <select
            data-testid={ `${ROUTE}${ROLE}` }
            id="select-type"
            onChange={ ({ target }) => { setRole(target.value); } }
          >
            <option value={ undefined }>Selecione um tipo de cargo</option>
            <option
              value="seller"
            >
              Vendedor
            </option>
            <option
              value="administrator"
            >
              Administrador
            </option>
            <option value="customer">Cliente</option>
          </select>
          <button
            type="button"
            data-testid={ `${ROUTE}${REGISTER}` }
            disabled={ disableButton }
          >
            CADASTRAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default AdminManage;
