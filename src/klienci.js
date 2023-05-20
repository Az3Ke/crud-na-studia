import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Klienci() {
  const [klienci, setKlienci] = useState([]); 

  useEffect(() => {
    axios
      .get("http://localhost:8086/") //pobieranie danych z bazy danych
      .then((res) => setKlienci(res.data)) 
      .catch((err) => console.log(err));
  }, []);



  //zamienić na popupform 
  return (
    <div className="rounded h-70 mx-auto bg-dark p-2 rounded"> 
              <Link to="/add" className="btn btn-primary">
          Dodaj klienta
        </Link>
      <div className="d-flex justify-content-center align-items-center">

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
                <td>{item["Adrese-mail"]}</td>  

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Klienci;
