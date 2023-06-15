import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProdukt() {
  const [Nazwaproduktu, setNazwaproduktu] = useState('');
  const [Opisproduktu, setOpisproduktu] = useState('');
  const [Ilosc, setIlosc] = useState('');
  const [Cena, setCena] = useState('');
  const [Datadodania, setDatadodania] = useState('');
  const [Kodkreskowy, setKodkreskowy] = useState('');
  const [iddostawcy, setiddostawcy] = useState('');
  const [dostawcy, setDostawcy] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8086/dostawcy")
      .then((res) => setDostawcy(res.data))
      .catch((err) => console.log(err));
  }, []);

  function submitForm(event) {
    event.preventDefault();
    axios
      .post('http://localhost:8086/addProdukt', {
        Nazwaproduktu,
        Opisproduktu,
        iddostawcy,
        Ilosc,
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
  }

  return (
    <div className="rounded h-70 mx-auto bg-dark p-2">
      <div className="w-70 bg-dark p-2 rounded mx-auto text-light">
        <form onSubmit={submitForm}>
          <h1>Dodaj produkt</h1>
          <div className="mb-2">
            <label htmlFor="nazwa">Nazwaproduktu</label>
            <input
              type="text"
              className="form-control"
              id="nazwa"
              placeholder="Nazwa"
              value={Nazwaproduktu}
              onChange={(e) => setNazwaproduktu(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="opisproduktu">Opis produktu</label>
            <input
              type="text"
              className="form-control"
              id="opisproduktu"
              placeholder="Opis produktu"
              value={Opisproduktu}
              onChange={(e) => setOpisproduktu(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="iddostawcy">Dostawca</label>
            <select
              className="form-control"
              id="iddostawcy"
              value={iddostawcy}
              onChange={(e) => setiddostawcy(e.target.value)}
              required
            >
              <option value="">Wybierz dostawcę</option>
              {dostawcy.map((dostawca) => (
                <option key={dostawca.Iddostawcy} value={dostawca.Iddostawcy}>
                  {dostawca.Nazwafirmy}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="ilosc">Ilość</label>
            <input
              type="text"
              className="form-control"
              id="ilosc"
              placeholder="Ilość"
              value={Ilosc}
              onChange={(e) => setIlosc(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="cena">Cena</label>
            <input
              type="text"
              className="form-control"
              id="cena"
              placeholder="Cena"
              value={Cena}
              onChange={(e) => setCena(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="datadodania">Data dodania</label>
            <input
              type="date"
              className="form-control"
              id="datadodania"
              placeholder="Data dodania"
              value={Datadodania}
              onChange={(e) => setDatadodania(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="kodkreskowy">Kod kreskowy</label>
            <input
              type="text"
              className="form-control"
              id="kodkreskowy"
              placeholder="Kod kreskowy"
              value={Kodkreskowy}
              onChange={(e) => setKodkreskowy(e.target.value)}
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
