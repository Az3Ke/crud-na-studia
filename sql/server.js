const express = require('express'); 
const app = express(); 
const mysql = require('mysql'); 
const cors = require('cors'); //pozwala na komunikację między serwerem a klientem

app.use(cors());
app.use(express.json()); 




const db = mysql.createConnection({     //łączenie z bazą danych
  host: 'localhost',  
  user: 'root',
  password: '',
  database: 'crud_app'
});







db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');  //sprawdzenie czy połączenie z bazą danych działa
});

app.get('/', (req, res) => {
  console.log('GET request received'); 
  const sql = 'SELECT * FROM klienci'; //pobieranie danych z bazy danych
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    console.log('GET request successful');
    res.json(result);
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO klienci (Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, `Adrese-mail`) VALUES (?,?,?,?,?,?,?)'; //dodawanie danych do bazy danych
  const values = [req.body.Imię, req.body.Nazwisko, req.body.Adres, req.body.Kodpocztowy, req.body.Miasto, req.body.Numertelefonu, req.body['Adrese-mail']]; //pobieranie danych z formularza
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record created successfully' });
  });
});

app.put('/Edit/:id', (req, res) => {
  const id = req.params.id;
  const { Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, 'Adrese-mail': Adresemail } = req.body;
  connection.query(
    'UPDATE klienci SET Imię = ?, Nazwisko = ?, Adres = ?, Kodpocztowy = ?, Miasto = ?, Numertelefonu = ?, `Adrese-mail` = ? WHERE ID = ?',
    [Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail, id],
    (err, results) => {
      if (err) {
        console.error('Error executing MySQL query: ' + err.stack);
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    }
  );
});


const port = 8086; //ustawienie portu
app.listen(port, () => {
  console.log(`Server started on port ${port}`); 
});
