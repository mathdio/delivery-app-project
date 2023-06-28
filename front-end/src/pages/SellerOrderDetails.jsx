import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import TotalPriceElement from '../components/TotalPriceElement';
import { ROUTE } from '../dataTestedId/SellerOrderDetailsIds';
import Context from '../context/Context';
import SellingOrderDetails from '../components/SellingOrderDetails';
import SellerOrderTable from '../components/SellerOrderTable';
import '../styles/SellerOrderDetails.css';
import loginRedirect from '../utils/loginRedirect';

function SellerOrderDetails({ match }) {
  const { params: { id } } = match;
  const { specificOrder, setSpecificOrder } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
  };

  useEffect(() => {
    loginRedirect(history);
    document.title = 'Order Details - Delivery App';

    const user = JSON.parse(localStorage.getItem('user'));
    fetchOrderById(id, user.token);
  }, []);

  return (
    <div>
      <Header />
      {loading ? (<h1>Carregando...</h1>) : (
        <main className="SellerOrderDetails-main-container">
          <SellingOrderDetails
            id={ specificOrder.order.id }
            seller={ specificOrder.seller.name }
            saleDate={ specificOrder.order.saleDate }
            status={ specificOrder.order.status }
          />
          <SellerOrderTable testIdRoute={ ROUTE } products={ specificOrder.products } />
          <TotalPriceElement testIdRoute={ ROUTE } />
        </main>
      )}
    </div>
  );
}

SellerOrderDetails.propTypes = {
  params: PropTypes.object,
}.isRequired;

export default SellerOrderDetails;
