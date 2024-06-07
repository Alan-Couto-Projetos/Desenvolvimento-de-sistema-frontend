import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarDetail = React.memo(() => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('model');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => {
        const sortedCars = response.data.sort((a, b) => a.id - b.id);
        setCars(sortedCars);
        setLoading(false);
      })
      .catch(error => {
        console.error('Houve um erro ao buscar os detalhes dos carros!', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/cars/${id}`)
      .then(response => {
        console.log('Carro removido com sucesso!', response.data);
        setCars(cars.filter(car => car.id !== id));
      })
      .catch(error => {
        console.error('Houve um erro ao remover o carro!', error);
      });
  };

  const handleUpdate = (car) => {
    localStorage.setItem('carToUpdate', JSON.stringify(car));
    navigate(`/carform/${car.id}`);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCars = cars.filter(car => {
    if (searchTerm === '') return true;
    if (searchType === 'model') return car.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    if (searchType === 'brand') return car.brand.toLowerCase().startsWith(searchTerm.toLowerCase());
    if (searchType === 'year') return car.year.toString().startsWith(searchTerm);
    return true;
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!cars.length) {
    return <div>Nenhum carro encontrado!</div>;
  }

  return (
    <div className="text-center mt-3" >
      <h1 >Lista de Carros</h1>
      <div className="my-3">
        <select className="form-select d-inline w-auto" value={searchType} onChange={handleSearchTypeChange}>
          <option value="model">Modelo</option>
          <option value="brand">Marca</option>
          <option value="year">Ano</option>
        </select>
        <input type="text" className="form-control d-inline w-auto ml-2" value={searchTerm} onChange={handleSearchTermChange} placeholder="Buscar..." />
      </div>
      {filteredCars.map(car => (
        <div key={car.id} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">{car.name}</h2>
            <p className="card-text">Marca: {car.brand}</p>
            <p className="card-text">Ano: {car.year}</p>
            <button onClick={() => handleDelete(car.id)} className="btn btn-primary mt-2">
              Excluir
            </button>
            <button onClick={() => handleUpdate(car)} className="btn btn-primary mt-2 ms-2">
              Atualizar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default CarDetail;