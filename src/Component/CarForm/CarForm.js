import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CarForm = React.memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({ name: '', brand: '', year: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const carToUpdate = JSON.parse(localStorage.getItem('carToUpdate'));
      if (carToUpdate && carToUpdate.id === parseInt(id, 10)) {
        setCar(carToUpdate);
      } else {
        axios.get(`http://localhost:5000/cars?id=${id}`)
          .then(response => {
            if (response.data.length > 0) {
              const { name, brand, year } = response.data[0];
              setCar({ name, brand, year });
            } else {
              console.error('Carro não encontrado!');
            }
          })
          .catch(error => {
            console.error('Houve um erro ao buscar os detalhes do carro!', error);
          });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!car.name || !car.brand || !car.year) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const currentYear = new Date().getFullYear();
    const yearInt = parseInt(car.year, 10);

    if (yearInt < 1886 || yearInt > currentYear) {
      setError('Por favor, insira um ano válido (entre 1886 e o ano atual).');
      return;
    }

    if (id) {
      axios.get(`http://localhost:5000/cars?id=${id}`)
        .then(response => {
          if (response.data.length > 0) {
            const carId = response.data[0].id;
            axios.put(`http://localhost:5000/cars?${carId}`, car)
              .then(response => {
                console.log('Carro atualizado!', response.data);
                localStorage.removeItem('carToUpdate');
                setCar({ name: '', brand: '', year: '' });
                navigate('/add-car');
              })
              .catch(error => {
                console.error('Houve um erro ao atualizar o carro!', error);
              });
          } else {
            console.error('Carro não encontrado para atualização!');
          }
        })
        .catch(error => {
          console.error('Houve um erro ao buscar o carro para atualização!', error);
        });
    } else {
      axios.post('http://localhost:5000/cars', car)
        .then(response => {
          console.log('Carro salvo!', response.data);
          setCar({ name: '', brand: '', year: '' });
          navigate('/add-car');
        })
        .catch(error => {
          console.error('Houve um erro ao salvar o carro!', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 >{id ? 'Atualizar Carro' : 'Adicionar Carro'}</h1>
          <div className="form-group">
            <label>Modelo:</label>
            <input type="text" className="form-control" name="name" value={car.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Marca:</label>
            <input type="text" className="form-control" name="brand" value={car.brand} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Ano:</label>
            <input type="number" className="form-control" name="year" value={car.year} onChange={handleChange} min="1886" max={new Date().getFullYear()} />
          </div >
          <div>{error}</div>
          <button type="submit" className="btn btn-primary mt-2">
            {id ? 'Atualizar' : 'Salvar'} carro
          </button>
        </div>
      </div>
    </form>
  );
});

export default CarForm;