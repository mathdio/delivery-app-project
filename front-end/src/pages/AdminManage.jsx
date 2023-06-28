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
import ManageTable from '../components/ManageTable';
import loginRedirect from '../utils/loginRedirect';

const CONTENT_TYPE = 'application/json';
const ALLOW_HEADERS = 'Content-Type, Authorization';
const ALLOW_METHODS = 'POST, PUT, PATCH, GET, DELETE, OPTIONS';

function AdminManage() {
  const [user, setUser] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [conflict, setConflict] = useState(false);
  const [usersTable, setUsersTable] = useState([]);
  const history = useHistory();

  useEffect(() => {
    loginRedirect(history);
    document.title = 'Manager Area- Delivery App';

    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    setUser(localStorageUser);
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      'http://localhost:3001/admin/users',
      {
        method: 'GET',
        headers: {
          'Content-Type': CONTENT_TYPE,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': ALLOW_HEADERS,
          'Access-Control-Allow-Methods': ALLOW_METHODS,
          authorization: user.token,
        },
      },
    );

    const data = await response.json();
    setUsersTable(data);
  };

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

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
          'Content-Type': CONTENT_TYPE,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': ALLOW_HEADERS,
          'Access-Control-Allow-Methods': ALLOW_METHODS,
          authorization: user.token,
        },
        body: JSON.stringify(requestBody),
      },
    );

    const CONFLICT_STATUS = 409;
    if (response.status === CONFLICT_STATUS) {
      setConflict(true);
    } else {
      await fetchUsers();
    }
  };

  const handleRemove = async (id) => {
    await fetch(
      `http://localhost:3001/admin/remove/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': CONTENT_TYPE,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': ALLOW_HEADERS,
          'Access-Control-Allow-Methods': ALLOW_METHODS,
          authorization: user.token,
        },
      },
    );

    await fetchUsers();
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
        <ManageTable users={ usersTable } handleRemove={ handleRemove } />
      </main>
    </div>
  );
}

export default AdminManage;
