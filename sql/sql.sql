CREATE DATABASE IF NOT EXISTS crud_app;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
USE crud_app;


CREATE TABLE `dostawcy` (
  `Iddostawcy` int(11) NOT NULL PRIMARY KEY,
  `Nazwafirmy` varchar(50) NOT NULL,
  `Adres` varchar(100) NOT NULL,
  `Kodpocztowy` varchar(10) NOT NULL,
  `Miasto` varchar(50) NOT NULL,
  `Numertelefonu` varchar(15) DEFAULT NULL,
  `Adresemail` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `dostawcy` (`Iddostawcy`, `Nazwafirmy`, `Adres`, `Kodpocztowy`, `Miasto`, `Numertelefonu`, `Adresemail`) VALUES
(1, 'Firma A', 'ul. Wiejska 1', '01-001', 'Warszawa', '+48123456789', 'firmaa@example.com'),
(2, 'Firma B', 'ul. Słoneczna 2', '02-002', 'Kraków', '+48123456790', 'firmab@example.com'),
(3, 'Firma C', 'ul. Ogrodowa 3', '03-003', 'Gdańsk', '+48123456791', 'firmac@example.com'),
(4, 'Firma D', 'ul. Kwiatowa 4', '04-004', 'Wrocław', '+48123456792', 'firmad@example.com'),
(5, 'Firma E', 'ul. Długa 5', '05-005', 'Poznań', '+48123456793', 'firme@example.com');

CREATE TABLE `klienci` (
  `idklienta` int(11) NOT NULL,
  `Imię` varchar(50) NOT NULL,
  `Nazwisko` varchar(50) NOT NULL,
  `Adres` varchar(100) NOT NULL,
  `Kodpocztowy` varchar(10) NOT NULL,
  `Miasto` varchar(50) NOT NULL,
  `Numertelefonu` varchar(15) DEFAULT NULL,
  `Adresemail` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `klienci` (`idklienta`, `Imię`, `Nazwisko`, `Adres`, `Kodpocztowy`, `Miasto`, `Numertelefonu`, `Adresemail`) VALUES
(1, 'adam', 'nowak', 'moniuszki 17', '32-300', 'nysa', '123123123', NULL),
(4, 'Anna', 'Kowalczyk', 'ul. Wiejska 15', '80-456', 'Gdańsk', '321654987', 'anna.kowalczyk@mail.com'),
(5, 'Tomasz', 'Nowicki', 'ul. Podgórska 20', '30-567', 'Kraków', '789654123', 'tomasz.nowicki@mail.com'),
(21, 'adam', 'a', 'moniuszki 17', '32-300', 'nysa', '123123', NULL);


CREATE TABLE `produkty` (
  `idproduktu` int(11) NOT NULL,
  `Nazwaproduktu` varchar(50) NOT NULL,
  `Opisproduktu` varchar(100) DEFAULT NULL,
  `iddostawcy` int(11) DEFAULT NULL,
  `Ilość` int(11) NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  `Datadodania` varchar(50) NOT NULL,
  `Kodkreskowy` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `produkty` (`idproduktu`, `Nazwaproduktu`, `Opisproduktu`, `iddostawcy`, `Ilość`, `Cena`, `Datadodania`, `Kodkreskowy`) VALUES
(1, 'Produkt A', 'Opis produktu A', 1, 100, '19.99', '2022-01-01', '1234567890123'),
(2, 'Produkt B', 'Opis produktu B', 2, 50, '49.99', '2022-02-01', '2345678901234'),
(3, 'Produkt C', 'Opis produktu C', 3, 200, '9.99', '2022-03-01', '3456789012345'),
(4, 'Produkt D', 'Opis produktu D', 4, 75, '29.99', '2022-04-01', '4567890123456'),
(5, 'Produkt E', 'Opis produktu E', 5, 150, '14.99', '2022-05-01', '5678901234567');


CREATE TABLE `zamówienia` (
  `idzamówienia` int(11) NOT NULL,
  `idklienta` int(11) DEFAULT NULL,
  `idproduktu` int(11) DEFAULT NULL,
  `Datazamówienia` varchar(50) NOT NULL,
  `Datadostawy` varchar(50) DEFAULT NULL,
  `Statuszamówienia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `zamówienia` (`idzamówienia`, `idklienta`, `idproduktu`, `Datazamówienia`, `Datadostawy`, `Statuszamówienia`) VALUES
(1, 1, 2, '2022-01-01', '2022-01-10', 'Zrealizowane'),
(2, 2, 4, '2022-02-01', '2022-02-10', 'W realizacji'),
(3, 3, 1, '2022-03-01', NULL, 'Zrealizowane'),
(4, 4, 5, '2022-04-01', '2022-04-10', 'Wysłane'),
(5, 5, 3, '2022-05-01', NULL, 'Nowe');



ALTER TABLE `klienci`
  ADD PRIMARY KEY (`idklienta`),
  ADD UNIQUE KEY `Adresemail` (`Adresemail`);


ALTER TABLE `produkty`
  ADD PRIMARY KEY (`idproduktu`),
  ADD KEY `iddostawcy` (`iddostawcy`);

ALTER TABLE `zamówienia`
  ADD PRIMARY KEY (`idzamówienia`),
  ADD KEY `idklienta` (`idklienta`),
  ADD KEY `idproduktu` (`idproduktu`);

ALTER TABLE `dostawcy`
  MODIFY `Iddostawcy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `klienci`
  MODIFY `idklienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;


ALTER TABLE `produkty`
  MODIFY `idproduktu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


ALTER TABLE `zamówienia`
  MODIFY `idzamówienia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
