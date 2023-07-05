import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTE,
  EMAIL,
  PASSWORD,
  BUTTON,
  REGISTER,
  INVALID } from '../dataTestedId/logInIds';
import styles from '../styles/Login.module.css';
import logo from '../images/logo.png';
import loggedRedirect from '../utils/loggedRedirect';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    loggedRedirect(history);
    document.title = 'Login - Delivery App';
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

    const NOT_FOUND_STATUS = 404;
    const UNAUTHORIZED_STATUS = 401;
    if (response.status === NOT_FOUND_STATUS
      || response.status === UNAUTHORIZED_STATUS) {
      setInvalidLogin(true);
      return 0;
    }

    const data = await response.json();

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
      } else if (user.role === 'administrator') {
        history.push('/admin/manage');
      } else {
        history.push('/customer/products');
      }
    }
  };

  return (
    <main className={ styles['main-container'] }>
      <div className={ styles['logo-container'] }>
        <img src={ logo } alt="" className={ styles['logo-img'] } />
        <h1 className={ styles.title }>Delivery App</h1>
        <a target="_blank" href="https://www.flaticon.com/free-icons/shipment" title="shipment icons" rel="noreferrer">
          Shipment icons created by Iconjam - Flaticon
        </a>
      </div>
      <form className={ styles.form }>
        <h1 className={ styles['form-heading'] }>Entre na sua conta</h1>

        <label
          htmlFor="email"
          className={ styles['form-label'] }
        >
          Email
          <input
            className={ styles['form-input'] }
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
          className={ styles['form-label'] }
        >
          Senha
          <input
            className={ styles['form-input'] }
            data-testid={ `${ROUTE}${PASSWORD}` }
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <div className={ styles['form-btn-container'] }>
          <button
            className={ styles.btn }
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
          <Link
            to="/register"
            className={ styles['link-btn'] }
          >
            <button
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
    </main>
  );
}

export default LogIn;
