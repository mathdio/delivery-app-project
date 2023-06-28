import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTE,
  EMAIL,
  NAME,
  PASSWORD,
  BUTTON,
  INVALID } from '../dataTestedId/registerIds';
import '../styles/register.css';
import logo from '../images/logo.png';
import loggedRedirect from '../utils/loggedRedirect';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [invalidRegister, setInvalidRegister] = useState(false);
  const history = useHistory();

  useEffect(() => {
    loggedRedirect(history);
    document.title = 'Register - Delivery App';
  }, []);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMin = 6;
    const validName = 12;
    if (regex.test(email)
    && password.length >= passwordMin
    && name.length > validName) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name, email, password]);

  const handleSubmit = async () => {
    const requestBody = {
      name,
      email,
      password,
    };

    const response = await fetch(
      'http://localhost:3001/users/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
        },
        body: JSON.stringify(requestBody),
      },
    );

    const data = await response.json();

    const CONFLICT_STATUS = 409;
    if (response.status === CONFLICT_STATUS) {
      setInvalidRegister(true);
      return 0;
    }

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      token: data.token,
    };
    localStorage.setItem('user', JSON.stringify(user));

    const CREATED_STATUS = 201;
    if (response.status === CREATED_STATUS) {
      history.push('/customer/products');
    }
  };

  return (
    <div className="Register-main-div">
      <img
        src={ logo }
        alt=""
        className="Register-logo-img"
      />
      <h1>Cadastre uma nova conta</h1>
      <form className="Register-form">
        <label htmlFor="name">
          Nome
          <input
            data-testid={ `${ROUTE}${NAME}` }
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            data-testid={ `${ROUTE}${EMAIL}` }
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            data-testid={ `${ROUTE}${PASSWORD}` }
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          className="btn btn-success"
          data-testid={ `${ROUTE}${BUTTON}` }
          type="button"
          id="subButton"
          name="subButton"
          disabled={ disableButton }
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
      </form>
      {
        invalidRegister ? (
          <div
            data-testid={ `${ROUTE}${INVALID}` }
            className="Register-invalid-warning"
          >
            Falha ao tentar registrar
          </div>
        ) : (null)
      }
    </div>
  );
}

export default Register;
