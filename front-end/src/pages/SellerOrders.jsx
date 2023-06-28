import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Context from '../context/Context';
import { ROUTE,
  ORDER_ID,
  DATE,
  STATUS,
  PRICE,
  ADDRESS } from '../dataTestedId/SellerOrdersIds';
import '../styles/SellerOrders.css';
import loginRedirect from '../utils/loginRedirect';

const DATE_CUT_LIMIT = 10;

function SellerOrders() {
  const { orders, fetchOrdersBySeller } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    loginRedirect(history);
    document.title = 'Orders - Delivery App';

    const user = JSON.parse(localStorage.getItem('user'));
    fetchOrdersBySeller(user.id, user.token);
  }, []);

  const getStatusClass = (status) => {
    if (status === 'Pendente') return 'SellerOrders-pending';
    if (status === 'Preparando'
    || status === 'Em Trânsito') return 'SellerOrders-preparing';
    if (status === 'Entregue') return 'SellerOrders-delivered';
  };

  return (
    <div className="SellerOrders-main-div">
      <Header />
      <table className="SellerOrders-table">
        <thead className="SellerOrders-thead">
          <tr className="SellerOrders-thead-tr">
            <th className="SellerOrders-th">Id</th>
            <th className="SellerOrders-th">Status</th>
            <th className="SellerOrders-th">Data</th>
            <th className="SellerOrders-th">Valor</th>
            <th className="SellerOrders-th">Endereço</th>
          </tr>
        </thead>
        <tbody className="SellerOrders-tbody">
          {orders.length > 0
          && orders.map(({ id,
            status,
            totalPrice,
            saleDate,
            deliveryAddress,
            deliveryNumber,
          }, index) => (
            <Link
              className="SellerOrders-tr-link"
              to={ `/seller/orders/${id}` }
              key={ index }
            >
              <tr className="SellerOrders-tbody-tr">
                <td
                  className="SellerOrders-id"
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
                  className="SellerOrders-date"
                  data-testid={ `${ROUTE}${DATE}${id}` }
                >
                  {saleDate.slice(0, DATE_CUT_LIMIT).split('-').reverse().join('/')}
                </td>
                <td
                  className="SellerOrders-price"
                  data-testid={ `${ROUTE}${PRICE}${id}` }
                >
                  {totalPrice.replace('.', ',')}
                </td>
                <td
                  className="SellerOrders-address"
                  data-testid={ `${ROUTE}${ADDRESS}${id}` }
                >
                  {`${deliveryAddress}, ${deliveryNumber}`}
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerOrders;
