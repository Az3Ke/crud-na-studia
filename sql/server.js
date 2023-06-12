const express = require('express'); 
const app = express(); 
const mysql = require('mysql'); 
const cors = require('cors'); //pozwala na komunikację między serwerem a klientem

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



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

app.get('/dostawcy', (req, res) => {
  console.log('GET request received');
  const sql = 'SELECT * FROM dostawcy';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    console.log('GET request dostawcy successful');
    res.json(result);
  });
});

app.get('/produkty', (req, res) => {
  console.log('GET request received');
  const sql = 'SELECT * FROM produkty';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    console.log('GET request produkty successful');
    res.json(result);
  });
});
app.get('/zamowienia', (req, res) => {
  console.log('GET request received');
  const sql = 'SELECT * FROM zamówienia';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    console.log('GET request zamówienia successful');
    res.json(result);
  });
});



app.post('/add', (req, res) => {
  const sql = 'INSERT INTO klienci (Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail) VALUES (?,?,?,?,?,?,?)'; //dodawanie danych do bazy danych
  const values = [req.body.Imię, req.body.Nazwisko, req.body.Adres, req.body.Kodpocztowy, req.body.Miasto, req.body.Numertelefonu, req.body.Adresemail]; //pobieranie danych z formularza
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record created successfully' });
  });
});

app.post('/adddostawca', (req, res) => {
  const sql =
    "INSERT INTO dostawcy (Nazwafirmy, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.Nazwafirmy,
    req.body.Adres,
    req.body.Kodpocztowy,
    req.body.Miasto,
    req.body.Numertelefonu,
    req.body.Adresemail,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record created successfully' });
  });
});




app.put('/Edit/:idklienta', (req, res) => {
  console.log('PUT request received at /Edit/:idklienta');
  const idklienta = req.params.idklienta; //pobieranie id z bazy danych
  const { Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail } = req.body; 
  const sql = 'UPDATE klienci SET `Imię` = ?, `Nazwisko` = ?, `Adres` = ?, `Kodpocztowy` = ?, `Miasto` = ?, `Numertelefonu` = ?, `Adresemail` = ? WHERE idklienta = ?';
  const values = [Imię, Nazwisko, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail, idklienta];
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: err.message });
    }
    res.sendStatus(200);
  });
});

app.put('/EditDostawca/:Iddostawcy', (req, res) => {
  console.log('PUT request received at /Edit/:iddostawcy');
  const Iddostawcy = req.params.Iddostawcy;
  const { Nazwafirmy, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail } = req.body;
  const sql = 'UPDATE dostawcy SET Nazwafirmy = ?, Adres = ?, Kodpocztowy = ?, Miasto = ?, Numertelefonu = ?, Adresemail = ? WHERE Iddostawcy = ?';
  const values = [Nazwafirmy, Adres, Kodpocztowy, Miasto, Numertelefonu, Adresemail, Iddostawcy];
  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: err.message });
    }
    res.sendStatus(200);
  });
});


app.delete('/delete/:idklienta', (req, res) => {
  console.log('DELETE request received at /delete/:idklienta');
  const idklienta = req.params.idklienta; //pobieranie id z bazy danych
  db.query(
    'DELETE FROM klienci WHERE idklienta = ?',
    [idklienta],
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

//wyszukiwanie po nzawisku
app.post("/search", (req, res) => {
  const searchTerm = req.body.searchTerm;

  const query = `SELECT * FROM klienci WHERE Nazwisko LIKE '%${searchTerm}%'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});



const port = 8086; //ustawienie portu
app.listen(port, () => {
  console.log(`Server started on port ${port}`); 
});
