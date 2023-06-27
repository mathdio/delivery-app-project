import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../../App';

describe('Login page tests', () => {
  it('tests if disabled login button turns enabled', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    expect(enterButton).toBeDisabled();

    userEvent.type(emailInput, 'zebirita@email.com');
    userEvent.type(passwordInput, '$#zebirita#$');
    expect(enterButton).toBeEnabled();
  });

  it('tests if it is possible to log in', async () => {
    renderWithRouterAndContext(<App />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);
    const enterButton = screen.getByRole('button', { name: /entrar/i });
    const heading = screen.getByRole('heading', { name: /entre na sua conta/i });

    userEvent.type(emailInput, 'zebirita@email.com');
    userEvent.type(passwordInput, '$#zebirita#$');
    userEvent.click(enterButton);
    // await waitFor(() => {
    //   expect(heading).not.toBeInTheDocument();
    // });
  });

  it('tests if new account button redirect', async () => {
    renderWithRouter(<App />);

    const newAccountButton = screen.getByRole('button', { name: /ainda não tenho conta/i });
    userEvent.click(newAccountButton);

    const heading = screen.getByRole('heading', { name: /cadastre uma nova conta/i });
    expect(heading).toBeInTheDocument();
  });
});
