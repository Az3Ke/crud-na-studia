import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProdukt() {
  const [Nazwaproduktu, setNazwaproduktu] = useState('');
  const [Opisproduktu, setOpisproduktu] = useState('');
  const [Ilość, setIlość] = useState('');
  const [Cena, setCena] = useState('');
  const [Datadodania, setDatadodania] = useState('');
  const [Kodkreskowy, setKodkreskowy] = useState('');

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8086/addProdukt', {
        Nazwa: Nazwaproduktu,
        Ilość,
        Cena,
        Datadodania,
        Kodkreskowy,
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
          <h1>Dodaj Produkt</h1>
          <div className="mb-2">
            <label htmlFor="NazwaProduktu">Nazwa Produktu</label>
            <input
              type="text"
              className="form-control"
              id="NazwaProduktu"
              placeholder="Nazwa Produktu"
              value={Nazwaproduktu}
              onChange={(e) => {
                setNazwaproduktu(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="OpisProduktu">Opis Produktu</label>
            <input
              type="text"
              className="form-control"
              id="OpisProduktu"
              placeholder="Opis Produktu"
              value={Opisproduktu}
              onChange={(e) => {
                setOpisproduktu(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Ilość">Ilość</label>
            <input
              type="text"
              className="form-control"
              id="Ilość"
              placeholder="Ilość"
              value={Ilość}
              onChange={(e) => {
                setIlość(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Cena">Cena</label>
            <input
              type="text"
              className="form-control"
              id="Cena"
              placeholder="Cena"
              value={Cena}
              onChange={(e) => {
                setCena(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Datadodania">Data dodania</label>
            <input
              type="date"
              className="form-control"
              id="Datadodania"
              placeholder="Data dodania"
              value={Datadodania}
              onChange={(e) => {
                setDatadodania(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="Kodkreskowy">Kod kreskowy</label>
            <input
              type="number"
              className="form-control"
              id="Kodkreskowy"
              placeholder="Kod kreskowy"
              value={Kodkreskowy}
              onChange={(e) => {
                setKodkreskowy(e.target.value);
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

export default AddProdukt;
