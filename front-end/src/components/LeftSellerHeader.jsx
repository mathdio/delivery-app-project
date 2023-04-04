import React from 'react';
import { Link } from 'react-router-dom';

function LeftSellerHeader() {
  return (
    <div>
      <Link to="/seller/orders">
        <p
          data-testid={ `${ROUTE}${HEADER_ORDERS}` }
        >
          Pedidos
        </p>
      </Link>
    </div>
  );
}

export default LeftSellerHeader;