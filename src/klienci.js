import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Klienci() {
  const [klienci, setKlienci] = useState([]);
  const [dostawcy, setDostawcy] = useState([]);
  const [produkty, setProdukty] = useState([]);
  const [zamowienia, setZamowienia] = useState([]);
  const [searchTermKlienci, setSearchTermKlienci] = useState('');
  const [searchTermDostawcy, setSearchTermDostawcy] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8086/") //pobieranie danych z bazy danych
      .then((res) => setKlienci(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8086/dostawcy") //pobieranie danych z bazy danych
      .then((res) => setDostawcy(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8086/produkty") //pobieranie danych z bazy danych
      .then((res) => setProdukty(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8086/zamowienia") //pobieranie danych z bazy danych
      .then((res) => setZamowienia(res.data))
      .catch((err) => console.log(err));
  }, []);

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:8086/delete/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const DeleteDostawcy = async (id) => {
    try {
      await axios.delete(`http://localhost:8086/delete/dostawcy/${id}`);
      window.location.reload();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSearchKlienci = async () => {
    try {
      const response = await axios.post("http://localhost:8086/search", {
        searchTerm: searchTermKlienci,
      });

      setKlienci(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchDostawcy = async () => {
    try {
      const response = await axios.post("http://localhost:8086/search/dostawcy", {
        searchTerm: searchTermDostawcy,
      });

      setDostawcy(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded h-70 mx-auto bg-dark rounded  ">
      <h1 className="text-center text-white p-2">Klienci</h1>
      <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between">
        <div className="p-2">
          <Link to="/add" className="btn btn-primary">
            Dodaj klienta
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center ">
          <input
            type="text"
            name="name"
            placeholder="Wyszukaj po nazwisku"
            value={searchTermKlienci}
            onChange={(e) => setSearchTermKlienci(e.target.value)}
          />
          <div className="p-2">
            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearchKlienci}
            >
              Wyszukaj
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-column  m-1">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>Id klienta</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Adres</th>
              <th>Kod pocztowy</th>
              <th>Miasto</th>
              <th>Numer telefonu</th>
              <th>Adres e-mail</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {klienci.map((item) => (
              <tr key={item.idklienta}>
                <td>{item.idklienta}</td>
                <td>{item.Imię}</td>
                <td>{item.Nazwisko}</td>
                <td>{item.Adres}</td>
                <td>{item.Kodpocztowy}</td>
                <td>{item.Miasto}</td>
                <td>{item.Numertelefonu}</td>
                <td>{item.Adresemail}</td>
                <td>
                  <Link
                    to={`Edit/${item.idklienta}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => Delete(item.idklienta)}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1 className="text-center text-white">Dostawcy</h1>
      <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between">
        <div className="p-2">
          <Link to="/Adddostawca" className="btn btn-primary">
            Dodaj Dostawce
          </Link>
        </div>
        <div className="d-flex justify-content-center align-items-center ">
          <input
            type="text"
            name="name"
            placeholder="Wyszukaj po Nazwie Firmy"
            value={searchTermDostawcy}
            onChange={(e) => setSearchTermDostawcy(e.target.value)}
          />
          <div className="p-2">
            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={handleSearchDostawcy}
            >
              Wyszukaj
            </button>
          </div>
        </div>
      </nav>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Id Dostawcy</th>
            <th>Nazwa Firmy</th>
            <th>Adres</th>
            <th>Kod pocztowy</th>
            <th>Miasto</th>
            <th>Numer telefonu</th>
            <th>Adres e-mail</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dostawcy.map((item) => (
            <tr key={item.Iddostawcy}>
              <td>{item.Iddostawcy}</td>
              <td>{item.Nazwafirmy}</td>
              <td>{item.Adres}</td>
              <td>{item.Kodpocztowy}</td>
              <td>{item.Miasto}</td>
              <td>{item.Numertelefonu}</td>
              <td>{item.Adresemail}</td>
              <td>
                <Link
                  to={`EditDostawca/${item.Iddostawcy}`}
                  type="button"
                  className="btn btn-warning"
                >
                  Edit
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => DeleteDostawcy(item.Iddostawcy)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}  </tbody>
          </table>
          <table className="table table-striped table-dark">
            <thead>
                        <h1 className="text-center">Produkty</h1>
                        <tr>
                        <th>Id produktu</th>
                          <th>Nazwa Produktu</th>
                          <th>Opis produktu</th>
                          <th>ID dostawcy</th>
                          <th>ilość</th>
                          <th>cena</th>
                          <th>Data dodania</th>
                          <th>Kod kreskowy</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {produkty.map((item) => (
                          <tr key={item.idproduktu}>
                          <td>{item.idproduktu}</td>
                          <td>{item.Nazwaproduktu}</td>
                          <td>{item.Opisproduktu}</td>
                          <td>{item.iddostawcy}</td>
                          <td>{item.Ilość}</td>
                          <td>{item.Cena}zł</td>
                          <td>{item.Datadodania}</td>
                          <td>{item.Kodkreskowy}</td> 
                            <td>
                           <Link to={`Edit/${item.idklienta}`} type="button" class="btn btn-warning">Edit</Link>
                          </td>
                          <td>
                          <button type="button" class="btn btn-danger" onClick={e => Delete(item.idklienta)}>Usuń</button>
                          </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table table-striped table-dark">
          <thead>
                        <h1 className="text-center">Zamówienia</h1>
                        <tr>
                          <th>Id Zamówienia</th>
                          <th>Id klienta</th>
                          <th>Id produktu</th>
                          <th>Data zamówienia</th>
                          <th>Data dostawy</th>
                          <th>Status zamówienia</th>
          
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {zamowienia.map((item) => (
                          <tr key={item.idzamówienia}>
                            <td>{item.idzamówienia}</td>
                            <td>{item.idklienta}</td>
                            <td>{item.idproduktu}</td>
                            <td>{item.Datazamówienia}</td>
                            <td>{item.Datadostawy}</td>
                            <td>{item.Statuszamówienia}</td>
                            <td>
                           <Link to={`Edit/${item.idklienta}`} type="button" class="btn btn-warning">Edit</Link>
                          </td>
                          <td>
                          <button type="button" class="btn btn-danger" onClick={e => Delete(item.idklienta)}>Usuń</button>
                          </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
}

export default Klienci;
