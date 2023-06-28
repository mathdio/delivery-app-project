import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import OrderTable from '../components/OrderTable';
import TotalPriceElement from '../components/TotalPriceElement';
import AddressDetails from '../components/AddressDetails';
import {
  ROUTE,
} from '../dataTestedId/CustomerCheckoutIds';
import '../styles/CustomerCheckout.css';
import loginRedirect from '../utils/loginRedirect';

function CustomerCheckout() {
  const history = useHistory();

  useEffect(() => {
    loginRedirect(history);
    document.title = 'Checkout - Delivery App';
  }, []);

  return (
    <div className="CustomerCheckout-main-container">
      <Header />
      <OrderTable testIdRoute={ ROUTE } />
      <TotalPriceElement testIdRoute={ ROUTE } />
      <AddressDetails />
    </div>
  );
}

export default CustomerCheckout;
