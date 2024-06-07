import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../../Component/Navbar/Navbar';

// Mock do componente Home
// Mock um módulo é criar uma versão falsa desse módulo que pode ser configurada para devolver 
//resultados sem fazer chamadas reais para a API.
const HomeMock = () => <div>Home component</div>;

describe('Navbar', () => {
  let pushSpy;

  beforeEach(() => {
    pushSpy = jest.fn();
  });

  test('navigation buttons work correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomeMock />} />
            <Route path="/cardetail" element={<div>Car Detail component</div>} />
            <Route path="/add-car" element={<div>Add Car component</div>} />
            <Route path="/about" element={<div>About component</div>} />
          </Routes>
          <Navbar />
        </MemoryRouter>
      );
    });

    // Simula o clique no botão "Página inicial"
    fireEvent.click(screen.getByText('Página inicial'));

    // Verifica se o método push foi chamado com a rota correta
    expect(window.location.pathname).toBe('/');
  });
});