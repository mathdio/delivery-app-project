import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE,
  EMAIL,
  PASSWORD,
  BUTTON,
  REGISTER,
  INVALID } from '../dataTestedId/logInIds';
import '../styles/logIn.css';
import logo from '../images/logo.png';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    document.title = 'Login - Delivery App';
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) history.push('/customer/products');
  }, []);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const passwordMin = 6;
    if (regex.test(email) && password.length >= passwordMin) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, password]);

  const handleSubmit = async () => {
    const requestBody = {
      email,
      password,
    };

    const response = await fetch(
      'http://localhost:3001/users/login',
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

    const NOT_FOUND_STATUS = 404;
    const UNAUTHORIZED_STATUS = 401;
    if (response.status === NOT_FOUND_STATUS
      || response.status === UNAUTHORIZED_STATUS) {
      setInvalidLogin(true);
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

    const OK_STATUS = 200;
    if (response.status === OK_STATUS) {
      if (user.role === 'seller') {
        history.push('/seller/orders');
      } else {
        history.push('/customer/products');
      }
    }
  };

  return (
    <div className="Login-main-div">
      <img src={ logo } alt="" className="Login-logo-img" />
      <form className="Login-form">
        <label
          htmlFor="email"
        >
          Email
          <input
            data-testid={ `${ROUTE}${EMAIL}` }
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label
          htmlFor="password"
        >
          Senha
          <input
            data-testid={ `${ROUTE}${PASSWORD}` }
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <div className="Login-btn-container">
          <button
            className="btn btn-success"
            data-testid={ `${ROUTE}${BUTTON}` }
            type="button"
            id="subButton"
            name="subButton"
            onClick={ handleSubmit }
            placeholder="Entrar"
            disabled={ disableButton }
          >
            Entrar
          </button>
          <Link to="/register">
            <button
              className="btn btn-outline-success"
              data-testid={ `${ROUTE}${REGISTER}` }
              name="registerButton"
              id="registerButton"
              type="button"
            >
              Ainda não tenho conta
            </button>
          </Link>
        </div>
      </form>
      {' '}
      {
        invalidLogin && (
          <section
            data-testid={ `${ROUTE}${INVALID}` }
            className="Login-invalid-warning"
          >
            E-mail ou senha inválidos
          </section>
        )
      }
    </div>
  );
}

export default LogIn;
