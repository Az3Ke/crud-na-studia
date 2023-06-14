SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

CREATE TABLE `dostawcy` (
  `Iddostawcy` int(11) NOT NULL PRIMARY KEY,
  `Nazwafirmy` varchar(50) NOT NULL,
  `Adres` varchar(100) NOT NULL,
  `Kodpocztowy` varchar(10) NOT NULL,
  `Miasto` varchar(50) NOT NULL,
  `Numertelefonu` varchar(15) DEFAULT NULL,
  `Adresemail` varchar(50) DEFAULT NULL
) 

INSERT INTO `dostawcy` (`Iddostawcy`, `Nazwafirmy`, `Adres`, `Kodpocztowy`, `Miasto`, `Numertelefonu`, `Adresemail`) VALUES

CREATE TABLE `klienci` (
  `idklienta` int(11) NOT NULL,
  `Imię` varchar(50) NOT NULL,
  `Nazwisko` varchar(50) NOT NULL,
  `Adres` varchar(100) NOT NULL,
  `Kodpocztowy` varchar(10) NOT NULL,
  `Miasto` varchar(50) NOT NULL,
  `Numertelefonu` varchar(15) DEFAULT NULL,
  `Adresemail` varchar(50) DEFAULT NULL
) 

INSERT INTO `klienci` (`idklienta`, `Imię`, `Nazwisko`, `Adres`, `Kodpocztowy`, `Miasto`, `Numertelefonu`, `Adresemail`) VALUES


CREATE TABLE `produkty` (
  `idproduktu` int(11) NOT NULL,
  `Nazwaproduktu` varchar(50) NOT NULL,
  `Opisproduktu` varchar(100) DEFAULT NULL,
  `iddostawcy` int(11) DEFAULT NULL,
  `Ilość` int(11) NOT NULL,
  `Cena` decimal(10,2) NOT NULL,
  `Datadodania` varchar(50) NOT NULL,
  `Kodkreskowy` varchar(20) DEFAULT NULL
) 

INSERT INTO `produkty` (`idproduktu`, `Nazwaproduktu`, `Opisproduktu`, `iddostawcy`, `Ilość`, `Cena`, `Datadodania`, `Kodkreskowy`) VALUES


CREATE TABLE `zamowienia` (
  `idzamowienia` int(11) NOT NULL,
  `idklienta` int(11) DEFAULT NULL,
  `idproduktu` int(11) DEFAULT NULL,
  `Datazamówienia` varchar(50) NOT NULL,
  `Datadostawy` varchar(50) DEFAULT NULL,
  `Statuszamówienia` varchar(50) NOT NULL
) 

INSERT INTO `zamowienia` (`idzamowienia`, `idklienta`, `idproduktu`, `Datazamówienia`, `Datadostawy`, `Statuszamówienia`) VALUES


ALTER TABLE `klienci`
  ADD PRIMARY KEY (`idklienta`),
  ADD UNIQUE KEY `Adresemail` (`Adresemail`);

ALTER TABLE `produkty`
  ADD PRIMARY KEY (`idproduktu`),
  ADD KEY `iddostawcy` (`iddostawcy`);

ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`idzamowienia`),
  ADD KEY `idklienta` (`idklienta`),
  ADD KEY `idproduktu` (`idproduktu`);

ALTER TABLE `dostawcy`
  MODIFY `Iddostawcy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `klienci`
  MODIFY `idklienta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

ALTER TABLE `produkty`
  MODIFY `idproduktu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `zamowienia`
  MODIFY `idzamowienia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

COMMIT;
