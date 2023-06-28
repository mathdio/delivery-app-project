import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Context from '../context/Context';
import { ROUTE,
  ORDER_ID,
  DATE,
  STATUS,
  PRICE } from '../dataTestedId/CustomerOrdersIds';
import '../styles/CustomerOrders.css';
import loginRedirect from '../utils/loginRedirect';

const DATE_CUT_LIMIT = 10;

function CustomerOrders() {
  const { orders, fetchOrders } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    loginRedirect(history);
    document.title = 'Orders - Delivery App';
    const user = JSON.parse(localStorage.getItem('user'));
    fetchOrders(user.id, user.token);
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Pendente') return 'CustomerOrders-pending';
    if (status === 'Preparando'
    || status === 'Em Trânsito') return 'CustomerOrders-preparing';
    if (status === 'Entregue') return 'CustomerOrders-delivered';
  };

  return (
    <div className="CustomerOrders-main-div">
      <Header />
      <table className="CustomerOrders-table">
        <thead className="CustomerOrders-thead">
          <tr className="CustomerOrders-thead-tr">
            <th className="CustomerOrders-th">Id</th>
            <th className="CustomerOrders-th">Status</th>
            <th className="CustomerOrders-th">Data</th>
            <th className="CustomerOrders-th">Valor</th>
          </tr>
        </thead>
        <tbody className="CustomerOrders-tbody">
          {orders.length > 0
        && orders.map(({ id, status, totalPrice, saleDate }, index) => (
          <Link
            className="CustomerOrders-tr-link"
            to={ `/customer/orders/${id}` }
            key={ index }
          >
            <tr className="CustomerOrders-tbody-tr">
              <td
                className="CustomerOrders-id"
                data-testid={ `${ROUTE}${ORDER_ID}${id}` }
              >
                {id}
              </td>
              <td
                className={ getStatusClass(status) }
                data-testid={ `${ROUTE}${STATUS}${id}` }
              >
                {status}
              </td>
              <td
                className="CustomerOrders-date"
                data-testid={ `${ROUTE}${DATE}${id}` }
              >
                {saleDate.slice(0, DATE_CUT_LIMIT).split('-').reverse().join('/')}
              </td>
              <td
                className="CustomerOrders-price"
                data-testid={ `${ROUTE}${PRICE}${id}` }
              >
                {totalPrice.replace('.', ',')}
              </td>
            </tr>
          </Link>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerOrders;
