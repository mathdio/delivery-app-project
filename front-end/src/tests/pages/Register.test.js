import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../../App';
import { invalidEmail,
  invalidName,
  invalidPassword,
  responseRegisterMock,
  validName,
  validEmail,
  validPassword } from '../mocks/Register.mock';

describe('Register page tests', () => {
  it('tests if link redirect to login page', () => {
    renderWithRouterAndContext(<App />, '/register');

    const loginLink = screen.getByText(/faça login/i);
    userEvent.click(loginLink);

    const loginHeading = screen.getByRole('heading', { name: /entre na sua conta/i });
    expect(loginHeading).toBeInTheDocument();
  });

  it('tests if register button remains disabled with invalid inputs', () => {
    renderWithRouterAndContext(<App />, '/register');

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(nameInput, invalidName);
    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, invalidPassword);
    expect(registerButton).toBeDisabled();
  });

  it('tests if register button turns enabled with valid inputs', () => {
    renderWithRouterAndContext(<App />, '/register');

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    expect(registerButton).toBeEnabled();
  });

  it(
    'tests if it is not possible to register with name or e-mail already registered',
    async () => {
      global.fetch = jest.fn(() => Promise.resolve({
        status: 409,
        json: () => Promise.resolve(null),
      }));

      renderWithRouterAndContext(<App />, '/register');

      const nameInput = screen.getByRole('textbox', { name: /nome/i });
      const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
      const passwordInput = screen.getByLabelText(/password/i);
      const registerButton = screen.getByRole('button', { name: /cadastrar/i });

      userEvent.type(nameInput, validName);
      userEvent.type(emailInput, validEmail);
      userEvent.type(passwordInput, validPassword);
      userEvent.click(registerButton);

      await waitFor(() => {
        const warning = screen.getByText(/falha ao tentar registrar/i);
        expect(warning).toBeInTheDocument();
      });
    },
  );

  it('tests if it is possible to register a new acocunt', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 201,
      json: jest.fn().mockResolvedValue(responseRegisterMock),
    }).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue([]),
    });
    const { history } = renderWithRouterAndContext(<App />, '/register');

    const nameInput = screen.getByRole('textbox', { name: /nome/i });
    const emailInput = screen.getByRole('textbox', { name: /e-mail/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const registerButton = screen.getByRole('button', { name: /cadastrar/i });

    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(registerButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
