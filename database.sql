	use master
	drop database if exists Elektrownia
	create database Elektrownia
	use Elektrownia
	go

	CREATE TABLE Reaktor (
	  Id int identity primary key check(Id in (1,2,3,4)),
	  PretyPaliwo int,
	  PretyKontrolne int,
	  TemperaturaReaktor int,
	  RadioaktywnoscPierw int,
	  RadioaktywnoscWtor int,
	  TemperaturaPierw int,
	  TemperaturaWtor int,
	  Cisnienie int,
	  ZapotrzebowaniePrad int,
	  ProdukcjaPrad int,
	  ZużyciePrad int,
	  CzyDziala bit,
	  Ciepło int 
	);


	CREATE TABLE Pracownik (
	  Id int primary key,
	  Imie varchar(30) check(len(Imie)>3),
	  Nazwisko varchar(30) check(len(Nazwisko)>3),
	  StanRoboczy bit,
	  Stanowisko varchar(30) check(len(Stanowisko)>3),
	);

	CREATE TABLE Alarm (
	  Id int primary key identity,
	  TypAlarmu varchar(50) not null check(TypAlarmu like 'Niski' or TypAlarmu like 'Sredni' or TypAlarmu like 'Wysoki'),
	  Godzina datetime not null,
	  ReaktorId int foreign key references Reaktor(Id)
	);

	CREATE TABLE Pracownik_Reaktor (
	PracwonikId int not null foreign key references Pracownik(Id),
	ReaktorId int not null foreign key references Reaktor(Id)
	);

	CREATE TABLE Dostawa (
	  Id int primary key,
	  TypDostawy varchar(30) not null check(len(TypDostawy)>3),
	  Godzina time,
	);

	INSERT INTO Reaktor
	values(
	  12,20,21,5,7,8,12,34,45,65,1,13,56
	);
	INSERT INTO Reaktor
	values(
	  12,20,21,5,7,8,12,34,45,65,1,13,56
	);
	INSERT INTO Reaktor
	values(
	  12,20,21,5,7,8,12,34,45,65,1,13,56
	);
	INSERT INTO Reaktor
	values(
	  12,20,21,5,7,8,12,34,45,65,1,13,56
	);
	INSERT INTO Alarm
	values
	('Niski','2022-06-06 15:30:15', 1);
	INSERT INTO Alarm
	values
	('Sredni','2022-06-9 08:30:15', 1);
	INSERT INTO Alarm
	values
	('Sredni','2022-06-22 15:30:15', 1);
	INSERT INTO Alarm
	values
	('Niski','2022-09-08 15:30:15', 1);
	INSERT INTO Alarm
	values
	('Wysoki','2022-06-09 22:30:15', 1);
	INSERT INTO Alarm
	values
	('Wysoki','2022-06-09 11:30:15', 1)
	INSERT INTO Alarm
	values
	('Niski','2021-06-09 11:30:15', 1)