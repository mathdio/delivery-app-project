import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../../App';
import { invalidEmail,
  invalidPassword,
  responseLoginMock,
  unregisteredEmail,
  validEmail,
  validPassword } from '../mocks/Login.mock';

describe('Login page tests', () => {
  it('tests if register butotn redirect to /register', () => {
    renderWithRouterAndContext(<App />, '/login');

    const newAccountButton = screen.getByRole('button', { name: /ainda não tenho conta/i });
    userEvent.click(newAccountButton);

    const heading = screen.getByRole('heading', { name: /cadastre uma nova conta/i });
    expect(heading).toBeInTheDocument();
  });

  it('tests if enter button remains disabled with invalid inputs', () => {
    renderWithRouterAndContext(<App />, '/login');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPassword);
    expect(enterButton).toBeDisabled();
  });

  it('tests if disabled login button turns enabled', () => {
    renderWithRouterAndContext(<App />, '/login');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(enterButton).toBeEnabled();
  });

  it(
    `tests if it is not possible to login with 
    unregistered customer or wrong info`,
    async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        status: 404,
        json: jest.fn().mockResolvedValue(null),
      });

      renderWithRouterAndContext(<App />, '/login');

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/senha/i);
      const enterButton = screen.getByRole('button', { name: /entrar/i });

      userEvent.type(emailInput, unregisteredEmail);
      userEvent.type(passwordInput, validPassword);
      userEvent.click(enterButton);

      await waitFor(async () => {
        setTimeout(() => {
          const warning = screen.getByTestId('common_login__element-invalid-email');
          expect(warning).toBeInTheDocument();
        }, 2000);
      });
    },
  );

  it('tests if it is possible to log in with customer account', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(responseLoginMock),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    });

    renderWithRouterAndContext(<App />, '/login');

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const heading = screen.getByRole('heading', { name: /entre na sua conta/i });

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(enterButton);

    await waitFor(() => {
      expect(heading).not.toBeInTheDocument();
    });
  });
});
