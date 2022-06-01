use master
drop database if exists Elektrownia
create database Elektrownia
use Elektrownia
go

CREATE TABLE Reaktor (
  Id int primary key,
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
  Id int primary key,
  TypAlarmu varchar(50) not null,
  Godzina time not null,
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

INSERT INTO Reaktor (id ,TemperaturaReaktor, TemperaturaPierw, TemperaturaWtor)
values(
  1,
  12,
  20,
  20
);