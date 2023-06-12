import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddDostawca() {
  const [Nazwafirmy, setNazwafirmy] = useState('');
  const [Adres, setAdres] = useState('');
  const [Kodpocztowy, setKodpocztowy] = useState('');
  const [Miasto, setMiasto] = useState('');
  const [Numertelefonu, setNumertelefonu] = useState('');
  const [Adresemail, setAdresemail] = useState('');
  const { ID } = useParams();
  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8086/EditDostawca/${ID}`, {
        Nazwafirmy,
        Adres,
        Kodpocztowy,
        Miasto,
        Numertelefonu,
        Adresemail,
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="rounded h-70 mx-auto bg-dark p-2">
      <div className="w-70 bg-dark p-2 rounded mx-auto text-light">
        <form onSubmit={submitForm}>
          <h1>Dodaj Dostawce</h1>
          <div className="mb-2">
            <label htmlFor="nazwa-firmy">Nazwa Firmy</label>
            <input
              type="text"
              className="form-control"
              id="nazwa-firmy"
              placeholder="Nazwa Firmy"
              onChange={(e) => {
                setNazwafirmy(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="adres">Adres</label>
            <input
              type="text"
              className="form-control"
              id="adres"
              placeholder="Adres"
              onChange={(e) => {
                setAdres(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="kod-pocztowy">Kod pocztowy</label>
            <input
              type="text"
              className="form-control"
              id="kod-pocztowy"
              placeholder="Kod pocztowy"
              onChange={(e) => {
                setKodpocztowy(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="miasto">Miasto</label>
            <input
              type="text"
              className="form-control"
              id="miasto"
              placeholder="Miasto"
              onChange={(e) => {
                setMiasto(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="numer-telefonu">Numer telefonu</label>
            <input
              type="number"
              className="form-control"
              id="numer-telefonu"
              placeholder="Numer telefonu"
              onChange={(e) => {
                setNumertelefonu(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="adres-email">Adres e-mail</label>
            <input
              type="email"
              className="form-control"
              id="adres-email"
              placeholder="Adres e-mail"
              onChange={(e) => {
                setAdresemail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <button type="submit" className="btn btn-primary">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDostawca;
