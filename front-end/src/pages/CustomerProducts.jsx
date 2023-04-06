import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Context from '../context/Context';
import {
  ROUTE,
  BTN_CART,
  CHECKOUT,
} from '../dataTestedId/CustomerProductsIds';
import '../styles/CostumerProducts.css';

function CustomerProducts() {
  const { products, globalCart, totalPrice, setTotalPrice } = useContext(Context);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    document.title = 'Products - Delivery App';
  }, []);

  useEffect(() => {
    const valueToUpdate = globalCart
      .reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

    const fixedValue = valueToUpdate.toFixed(2).replace('.', ',');
    setTotalPrice(fixedValue);

    if (valueToUpdate > 0) setDisabled(false);
    else setDisabled(true);
  }, [globalCart]);

  return (
    <div className="CustomerProducts-main-div">
      <Header />
      <section className="CustomerProducts-cart-container">
        <Link
          to="/customer/checkout"
          className="CustomerProducts-cart-link"
        >
          <button
            type="button"
            data-testid={ `${ROUTE}${BTN_CART}` }
            disabled={ disabled }
            className="CustomerProducts-button-cart"
          >
            CARRINHO
          </button>
        </Link>
        <p data-testid={ `${ROUTE}${CHECKOUT}` }>
          {totalPrice}
        </p>
      </section>
      <section className="CustomerProducts-cardContainer">
        <div className="CustomerProducts-sub-container">
          {products.map(({ id, name, price, urlImage }) => (
            <ProductCard
              key={ id }
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default CustomerProducts;
