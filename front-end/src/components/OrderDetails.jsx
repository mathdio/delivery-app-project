import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { ROUTE,
  ORDER_ID,
  SELLER,
  DATE,
  STATUS,
  CHECK } from '../dataTestedId/CustomerOrderDetailsIds';
import Context from '../context/Context';
import '../styles/OrderDetails.css';

const DATE_CUT_LIMIT = 10;

function OrderDetails({ id, seller, saleDate, status }) {
  const { handleStatus } = useContext(Context);
  const [statusClass, setStatusClass] = useState('OrderDetails-pending');
  const [disabledButton, setDisabledButton] = useState('true');
  const [user, setUser] = useState();
  const [orderStatus, setOrderStatus] = useState();

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    setUser(localStorageUser);
    setOrderStatus(status);
  }, []);

  useEffect(() => {
    if (orderStatus === 'Preparando'
    || orderStatus === 'Em Trânsito') setStatusClass('OrderDetails-preparing');
    if (orderStatus === 'Em Trânsito') setDisabledButton(false);
    if (orderStatus === 'Entregue') {
      setStatusClass('OrderDetails-delivered');
      setDisabledButton(true);
    }
  }, [orderStatus]);

  const handleDelivered = async (orderId, statusToChange) => {
    await handleStatus(orderId, statusToChange, user.token);
    setOrderStatus('Entregue');
    setDisabledButton(true);
  };

  return (
    <div className="OrderDetails-main-div">
      <p data-testid={ `${ROUTE}${ORDER_ID}` } className="OrderDetails-details">
        {id}
      </p>
      <p data-testid={ `${ROUTE}${SELLER}` } className="OrderDetails-details">
        {seller}
      </p>
      <p data-testid={ `${ROUTE}${DATE}` } className="OrderDetails-details">
        {saleDate.slice(0, DATE_CUT_LIMIT).split('-').reverse().join('/')}
      </p>
      <p data-testid={ `${ROUTE}${STATUS}` } className={ statusClass }>
        {orderStatus}
      </p>
      <button
        className="OrderDetails-btn"
        type="button"
        data-testid={ `${ROUTE}${CHECK}` }
        disabled={ disabledButton }
        onClick={ () => handleDelivered(id, 'Entregue') }
      >
        Marcar como entregue
      </button>
    </div>
  );
}

OrderDetails.propTypes = {
  id: PropTypes.number,
  seller: PropTypes.string,
}.isRequired;

export default OrderDetails;
