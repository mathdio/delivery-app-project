import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ROUTE,
  HEADER_NAME,
  HEADER_LOGOUT,
} from '../dataTestedId/clientHeaderIds';
import Context from '../context/Context';
import LeftSellerHeader from './LeftSellerHeader';
import LeftCustomerHeader from './LeftCustomerHeader';
import '../styles/Header.css';

function Header() {
  const history = useHistory();
  const { userName, setUserName } = useContext(Context);
  const [role, setRole] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      history.push('/login');
    } else {
      setUserName(user.name);
      setRole(user.role);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <header className="Header-header-container">
      <div className="Header-subcontainer-left">
        {role === 'seller' && <LeftSellerHeader />}
        {role === 'customer' && <LeftCustomerHeader />}
      </div>
      <div className="Header-subcontainer-right">
        <p
          data-testid={ `${ROUTE}${HEADER_NAME}` }
          className="Header-user-name"
        >
          {userName}
        </p>
        <button
          className="Header-btn-logout"
          data-testid={ `${ROUTE}${HEADER_LOGOUT}` }
          type="button"
          id="logOut"
          name="logOut"
          onClick={ handleLogOut }
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
