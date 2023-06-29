import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../../App';
import { loginEmail,
  loginPassword,
  productsMock,
  responseLoginMock } from '../mocks/CustomerProducts.mock';

const PRODUCTS_ENDPOINT = '/customer/products';

describe('CustomerProducts page tests', () => {
  it('tests if products list was rendered in page', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(responseLoginMock),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(productsMock),
    });

    const { history } = renderWithRouterAndContext(<App />, '/login');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, loginEmail);
    userEvent.type(passwordInput, loginPassword);
    userEvent.click(enterButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe(PRODUCTS_ENDPOINT);
      const firstProductName = screen
        .getByTestId('customer_products__element-card-title-1');
      const secondProductName = screen
        .getByTestId('customer_products__element-card-title-2');
      const shoppingCartValue = screen
        .getByTestId('customer_products__checkout-bottom-value');
      expect(firstProductName).toHaveTextContent('Skol Lata 250ml');
      expect(secondProductName).toHaveTextContent('Heineken 600ml');
      expect(shoppingCartValue).toHaveTextContent('0,00');
    });
  });

  it(
    `tests if orders button redirects to /customer/orders 
    and products button redirects to /customer/products`,
    async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([]),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([]),
      });

      const { history } = renderWithRouterAndContext(<App />, PRODUCTS_ENDPOINT);

      await waitFor(() => {
        const productsRedirectButton = screen
          .getByTestId('customer_products__element-navbar-link-products');
        userEvent.click(productsRedirectButton);
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe(PRODUCTS_ENDPOINT);

        const ordersRedirectButton = screen
          .getByTestId('customer_products__element-navbar-link-orders');
        userEvent.click(ordersRedirectButton);
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/orders');
      });
    },
  );

  it(
    `tests if adding products to cart increases cart total value 
    and clicking cart button redirect to /customer/checkout`,
    async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(productsMock),
      }).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([]),
      });

      const { history } = renderWithRouterAndContext(<App />, PRODUCTS_ENDPOINT);

      await waitFor(() => {
        const shoppingCartValue = screen
          .getByTestId('customer_products__checkout-bottom-value');
        const firstPlusButton = screen
          .getByTestId('customer_products__button-card-add-item-1');
        const secondPlusButton = screen
          .getByTestId('customer_products__button-card-add-item-2');
        userEvent.click(firstPlusButton);
        userEvent.click(secondPlusButton);
        expect(shoppingCartValue).toHaveTextContent('9,70');

        const cartButton = screen.getByTestId('customer_products__button-cart');
        userEvent.click(cartButton);
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe('/customer/checkout');
      });
    },
  );
});
