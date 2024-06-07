import React from 'react'; 
import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarDetail from '../../Component/CarDetail/CarDetail.js'; 

// Mock da biblioteca axios
// Mock um módulo é criar uma versão falsa desse módulo que pode ser configurada para devolver 
//resultados sem fazer chamadas reais para a API.
jest.mock('axios');

test('exibe carros e lida com cliques nos botões', async () => {
  const mockCars = [
    { id: 1, name: 'Car 1', brand: 'Brand 1', year: 2022 },
    { id: 2, name: 'Car 2', brand: 'Brand 2', year: 2023 }
  ];

  axios.get.mockResolvedValueOnce({ data: mockCars }); // Mock da função axios.get

  // Renderiza o componente CarDetail dentro de um MemoryRouter
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<CarDetail />} />
      </Routes>
    </MemoryRouter>
  );

  // Aguarda a renderização dos elementos
  await waitFor(() => {
    expect(screen.getByText('Lista de Carros')).toBeInTheDocument();
  });

  // Verifica se cada carro está presente e clica nos botões
  const deleteButtons = screen.getAllByText('Excluir');
  const updateButtons = screen.getAllByText('Atualizar');

  mockCars.forEach(async (car, index) => {
    await waitFor(() => {
      expect(screen.getByText(car.name)).toBeInTheDocument();
      expect(screen.getByText(`Marca: ${car.brand}`)).toBeInTheDocument();
      expect(screen.getByText(`Ano: ${car.year}`)).toBeInTheDocument();
    });

    fireEvent.click(deleteButtons[index]);
    fireEvent.click(updateButtons[index]);
  });
});