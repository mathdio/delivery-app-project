import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { EMAIL,
  INVALID,
  NAME,
  PASSWORD,
  REGISTER,
  ROLE,
  ROUTE } from '../dataTestedId/AdminManageIds';

function AdminManage() {
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [conflict, setConflict] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Manager Area- Delivery App';

    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (!localStorageUser || !localStorageUser.token) {
      history.push('/login');
    } else {
      setUser(localStorageUser);
    }
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

  const handleSubmit = async () => {
    const requestBody = {
      name,
      email,
      password,
      role,
    };

    const response = await fetch(
      'http://localhost:3001/admin/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
          authorization: user.token,
        },
        body: JSON.stringify(requestBody),
      },
    );

    const CONFLICT_STATUS = 409;
    if (response.status === CONFLICT_STATUS) {
      setConflict(true);
    }
  };

  return (
    <div>
      <Header />
      <main>
        {conflict && (
          <span
            data-testid={ `${ROUTE}${INVALID}` }
          >
            Name or e-mail already exists in users database.
          </span>)}
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
            onClick={ handleSubmit }
          >
            CADASTRAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default AdminManage;
