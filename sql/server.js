const express = require('express'); 
const app = express(); 
const mysql = require('mysql'); 
const cors = require('cors'); //pozwala na komunikację między serwerem a klientem

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');

  db.query('CREATE DATABASE IF NOT EXISTS crud_app', (error) => { //tworzenie bazy danych
    if (error) throw error;
    console.log('crud_app database created');

    db.query('USE crud_app', (useError) => { //używanie bazy danych
      if (useError) throw useError;
      console.log('Using crud_app database'); 

      const createTables = [ 
                            `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO"`,
                      `CREATE TABLE IF NOT EXISTS dostawcy (
                        Iddostawcy int(11) NOT NULL PRIMARY KEY,
                        Nazwafirmy varchar(50) NOT NULL,
                        Adres varchar(100) NOT NULL,
                        Kodpocztowy varchar(10) NOT NULL,
                        Miasto varchar(50) NOT NULL,
                        Numertelefonu varchar(15) DEFAULT NULL,
                        Adresemail varchar(50) DEFAULT NULL
                      )`,
                      `CREATE TABLE IF NOT EXISTS klienci (
                        idklienta int(11) NOT NULL,
                        Imię varchar(50) NOT NULL,
                        Nazwisko varchar(50) NOT NULL,
                        Adres varchar(100) NOT NULL,
                        Kodpocztowy varchar(10) NOT NULL,
                        Miasto varchar(50) NOT NULL,
                        Numertelefonu varchar(15) DEFAULT NULL,
                        Adresemail varchar(50) DEFAULT NULL,
                        PRIMARY KEY (idklienta),
                        UNIQUE KEY Adresemail (Adresemail)
                      )`,
                      `CREATE TABLE IF NOT EXISTS produkty (
                        idproduktu int(11) NOT NULL,
                        Nazwaproduktu varchar(50) NOT NULL,
                        Opisproduktu varchar(100) DEFAULT NULL,
                        iddostawcy int(11) DEFAULT NULL,
                        Ilość int(11) NOT NULL,
                        Cena decimal(10,2) NOT NULL,
                        Datadodania varchar(50) NOT NULL,
                        Kodkreskowy varchar(20) DEFAULT NULL,
                        PRIMARY KEY (idproduktu),
                        KEY iddostawcy (iddostawcy)
                      )`,
                      `CREATE TABLE IF NOT EXISTS zamowienia (
                        idzamowienia int(11) NOT NULL,
                        idklienta int(11) DEFAULT NULL,
                        idproduktu int(11) DEFAULT NULL,
                        Datazamówienia varchar(50) NOT NULL,
                        Datadostawy varchar(50) DEFAULT NULL,
                        Statuszamówienia varchar(50) NOT NULL,
                        PRIMARY KEY (idzamowienia),
                        KEY idklienta (idklienta),
                        KEY idproduktu (idproduktu)
                      )`,
                      `ALTER TABLE dostawcy MODIFY Iddostawcy int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6`,
                      `ALTER TABLE klienci MODIFY idklienta int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23`,
                      `ALTER TABLE produkty MODIFY idproduktu int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6`,
                      `ALTER TABLE zamowienia MODIFY idzamowienia int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6`,
                      `COMMIT`
      ];
      createTables.forEach((query) => { //tworzenie tabel
        db.query(query, (createQueryError, results) => {
          if (createQueryError) throw createQueryError;
          console.log(`Query executed successfully: ${query}`);
        });
      });
    });
  });
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
  const sql = 'SELECT * FROM zamowienia';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    console.log('GET request zamowienia successful');
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
  const values = [req.body.Nazwafirmy,req.body.Adres,req.body.Kodpocztowy,req.body.Miasto,req.body.Numertelefonu,req.body.Adresemail,
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

app.delete('/delete/dostawcy/:Iddostawcy', (req, res) => {
  console.log('DELETE request received at /delete/dostawcy/:Iddostawcy');
  const Iddostawcy = req.params.Iddostawcy; //pobieranie id z bazy danych
  db.query(
    'DELETE FROM dostawcy WHERE Iddostawcy = ?',
    [Iddostawcy],
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

app.delete('/delete/produkty/:idproduktu', (req, res) => {
  console.log('DELETE request received at /delete/dostawcy/:idproduktu');
  const Iddostawcy = req.params.idproduktu; //pobieranie id z bazy danych
  db.query(
    'DELETE FROM produkty WHERE idproduktu = ?',
    [Iddostawcy],
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
app.delete('/delete/Zamowienia/:idzamowienia', (req, res) => {
  console.log('DELETE request received at /delete/Zamowienia/:idzamowienia');
  const idzamowienia = req.params.idzamowienia; 
  db.query(
    'DELETE FROM zamowienia WHERE idzamowienia = ?',
    [idzamowienia],
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
app.post("/search/", (req, res) => {
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
app.post("/search/dostawcy", (req, res) => {
  const searchTerm = req.body.searchTerm;

  const query = `SELECT * FROM dostawcy WHERE Nazwafirmy LIKE ?`;
  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});
app.post("/search/Produkty", (req, res) => {
  const searchTerm = req.body.searchTerm;

  const query = `SELECT * FROM produkty WHERE Nazwaproduktu LIKE ?`;
  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue], (err, results) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});
app.post("/search/Zamowienia", (req, res) => {
  const searchTerm = req.body.searchTerm;

  const query = "SELECT * FROM zamowienia WHERE idzamowienia LIKE ?";
  const searchValue = `%${searchTerm}%`;

  db.query(query, [searchValue], (err, results) => {
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
