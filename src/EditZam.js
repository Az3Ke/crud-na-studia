import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

function EditZam() {
  const [Datazamowienia, setDatazamowienia] = useState('');
  const [Datadostawy, setDatadostawy] = useState('');
  const [Statuszamowienia, setStatuszamowienia] = useState('');
  const [klienci, setKlienci] = useState([]);
  const [produkty, setProdukty] = useState([]);
  const [idklienta, setidklienta] = useState('');
  const navigate = useNavigate();
  const [idproduktu, setidproduktu] = useState('');
  const { ID } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8086/Produkty")
      .then((res) => setProdukty(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8086/")
      .then((res) => setKlienci(res.data))
      .catch((err) => console.log(err));
  }, []);

  function submitForm(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8086/EditZam/${ID}`, {
        Datazamowienia,
        Datadostawy,
        Statuszamowienia,
        idproduktu,
        idklienta,
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
    <div className="vh-100" style={{backgroundColor: "#36393e"  }}>
    <div className="rounded h-70 mx-auto bg-dark p-2">
      <div className="w-70 bg-dark p-2 rounded mx-auto text-light">
        <form onSubmit={submitForm}>
          <h1>Edytuj Zamówienie</h1>
          <div className="mb-2">
            <label htmlFor="datazamowienia">Data zamówienia</label>
            <input
              type="date"
              className="form-control"
              id="datazamowienia"
              placeholder="data zamówienia"
              value={Datazamowienia}
              onChange={(e) => setDatazamowienia(e.target.value)}
              required
            />
          </div>
          <div className="mb-22">
            <label htmlFor="datadostawy">Data dostawy</label>
            <input
              type="date"
              className="form-control"
              id="datadostawy"
              placeholder="Data dostawy"
              value={Datadostawy}
              onChange={(e) => setDatadostawy(e.target.value)}
              required
            />
          </div>
            <div className="mb-2">
              <label htmlFor="statuszamowienia">Status zamówienia</label>
              <select
                className="form-control"
                id="statuszamowienia"
                value={Statuszamowienia}
                onChange={(e) => setStatuszamowienia(e.target.value)}
                required
              >
                <option value="">Status zamówienia</option>
                <option value="Zrealizowane">Zrealizowane</option>
                <option value="Niezrealizowane">Niezrealizowane</option>
                <option value="W trakcie realizacji">W trakcie realizacji</option>
                <option value="Anulowane">Anulowane</option>
                <option value="Nie znany">Nie znany</option>
              </select>
            </div>
          <div className="mb-2">
            <label htmlFor="idproduktu">Produkt</label>
            <select
              className="form-control"
              id="idproduktu"
              value={idproduktu}
              onChange={(e) => setidproduktu(e.target.value)}
              required
            >
              <option value="">Wybierz produkt</option>
              {produkty.map((item) => (
                <option key={item.idproduktu} value={item.idproduktu}>
                  {item.Nazwaproduktu}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="idklienta">Klient</label>
            <select
              className="form-control"
              id="idklienta"
              value={idklienta}
              onChange={(e) => setidklienta(e.target.value)}
              required
            >
              <option value="">Wybierz klienta</option>
              {klienci.map((item) => (
                <option key={item.idklienta} value={item.idklienta}>
                  {item.Nazwisko}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <button type="submit" className="btn btn-primary">
              Zapisz
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default EditZam;
