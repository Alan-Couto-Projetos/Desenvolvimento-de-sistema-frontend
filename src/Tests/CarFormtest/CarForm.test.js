import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CarForm from '../../Component/CarForm/CarForm.js';

// Mock da função axios
// Mock um módulo é criar uma versão falsa desse módulo que pode ser configurada para devolver 
//resultados sem fazer chamadas reais para a API.
jest.mock('axios');

// Mock do useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CarForm', () => {
  test('deve chamar handleSubmit ao enviar o formulário', async () => {
    // Configura o mock do axios.post para retornar uma resposta simulada
    axios.post.mockResolvedValueOnce({ data: { id: 1, name: 'Fusca', brand: 'VW', year: '1970' } });

    // Simula o retorno do ID do carro ao buscar por ID
    axios.get.mockResolvedValueOnce({ data: [{ id: 1 }] });

    // Mock da função navigate
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

    const { getByRole, container, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CarForm />} />
        </Routes>
      </MemoryRouter>
    );

    // Preenche os campos do formulário
    const formData = {
      name: 'Fusca',
      brand: 'VW',
      year: '1970',
    };

    const inputName = container.querySelector('input[name="name"]');
    const inputBrand = container.querySelector('input[name="brand"]');
    const inputYear = container.querySelector('input[name="year"]');

    fireEvent.change(inputName, { target: { value: formData.name } });
    fireEvent.change(inputBrand, { target: { value: formData.brand } });
    fireEvent.change(inputYear, { target: { value: formData.year } });

    // Simula o envio do formulário chamando a função handleSubmit
    fireEvent.click(getByText('Salvar carro'));

    // Verifica se axios.post foi chamado corretamente
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/cars', formData)
    );

    // Verifica se a função de navegação foi chamada após o envio do formulário
    expect(mockNavigate).toHaveBeenCalledWith('/add-car');
  });
});