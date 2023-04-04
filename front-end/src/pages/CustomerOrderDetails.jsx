import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import OrderTable from '../components/OrderTable';
import TotalPriceElement from '../components/TotalPriceElement';
import { ROUTE } from '../dataTestedId/CustomerOrderDetailsIds';
import OrderDetails from '../components/OrderDetails';
import Context from '../context/Context';

function CustomerOrderDetails({ match }) {
  const { specificOrder, setSpecificOrder } = useContext(Context);
  const { params: { id } } = match;
  const [loading, setLoading] = useState(true);

  const fetchOrderById = async (orderId, token) => {
    const response = await fetch(
      `http://localhost:3001/sales/order/${orderId}`,
      {
        method: 'GET',
        headers: {
          authorization: token,
        },
      },
    );
    const data = await response.json();
    setSpecificOrder(data);
    setLoading(false);
    console.log(specificOrder);
  };

  useEffect(() => {
    document.title = 'Order Details - Delivery App';
    const user = JSON.parse(localStorage.getItem('user'));
    fetchOrderById(id, user.token);
  }, []);

  return (
    <div>
      <Header />
      {loading ? (<h1>Carregando...</h1>) : (
        <div>
          <OrderDetails
            id={ specificOrder.order.id }
            seller={ specificOrder.seller.name }
            saleDate={ specificOrder.order.saleDate }
            status={ specificOrder.order.status }
          />
          <OrderTable testIdRoute={ ROUTE } products={ specificOrder.products } />
          <TotalPriceElement testIdRoute={ ROUTE } />
        </div>
      )}
    </div>
  );
}

CustomerOrderDetails.propTypes = {
  params: PropTypes.object,
}.isRequired;

export default CustomerOrderDetails;
