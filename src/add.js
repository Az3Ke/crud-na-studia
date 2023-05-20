import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function Add() { 
  const [Imię, setImie] = useState('');
  const [Nazwisko, setNazwisko] = useState(''); 
  const [Adres, setAdres] = useState('');
  const [Kodpocztowy, setKodpocztowy] = useState('');
  const [Miasto, setMiasto] = useState('');
  const [Numertelefonu, setNumer_telefonu] = useState(''); 
  const [Adresemail, setAdresemail] = useState('');

  const navigate = useNavigate();

  function submitForm(event) {
    event.preventDefault(); 
    axios  // wysyłanie danych do bazy danych
      .post('http://localhost:8086/add', 
       {
        Imię,
        Nazwisko,
        Adres,
        Kodpocztowy,
        Miasto,
        Numertelefonu,
        Adresemail,
      })
      .then((res) => { 
        console.log(res); 
        navigate('/'); //przekierowanie na stronę główną
      })
      .catch((err) => { 
        console.error(err);
      });
  }

  return (
<div className="rounded h-70 mx-auto bg-dark p-2">
<div className='w-70 bg-dark p-2 rounded mx-auto text-light'>
  <form onSubmit={submitForm}>
    <h1>Dodaj klienta</h1>
    <div className="mb-2">
      <label htmlFor='imie'>Imię</label>
      <input type="text" className="form-control" id="imie" placeholder="Imię" 
      onChange={(e) => {setImie(e.target.value);}} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='nazwisko'>Nazwisko</label>
      <input type="text" className="form-control" id="nazwisko" placeholder="Nazwisko"
      onChange={(e) => {setNazwisko(e.target.value);}} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='adres'>Adres</label>
      <input type="text" className="form-control" id="adres" placeholder="Adres"
      onChange={(e) => {setAdres(e.target.value); }} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='kodpocztowy'>Kod pocztowy</label>
      <input type="text" className="form-control" id="kodpocztowy" placeholder="Kod pocztowy" 
      onChange={(e) => {setKodpocztowy(e.target.value);}} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='miasto'>Miasto</label>
      <input type="text" className="form-control" id="miasto" placeholder="Miasto" 
      onChange={(e) => {setMiasto(e.target.value);}} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='numertelefonu'>Numer telefonu</label>
      <input type="number" className="form-control" id="numertelefonu" placeholder="Numer telefonu" 
      onChange={(e) => {setNumer_telefonu(e.target.value);}} required/>
    </div>
    <div className="mb-2">
      <label htmlFor='adrese-mail'>Adres e-mail</label>
      <input type="email" className="form-control" id="adrese-mail" placeholder="Adres e-mail" 
      onChange={(e) => {setAdresemail(e.target.value);}} required />
    </div>
    <div className="mb-2">
      <button type="submit" className="btn btn-primary">Dodaj</button>
    </div>
  </form>
</div>
</div>

  );
}

export default Add;