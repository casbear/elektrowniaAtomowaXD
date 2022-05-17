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
  Temperaturapierw int,
  TemperaturaWtor int,
  Cisnienie int,
  ZapotrzebowaniePrad int,
  ProdukcjaPrad int,
  Zu¿yciePrad int,
  CzyDziala bit,
  Ciep³o int 
);

CREATE TABLE Pracownik (
  Id int primary key
  Imiê varchar(30),
  Nazwisko varchar(30),
  StanRoboczy bit,
  Stanowisko varchar(30),
);

CREATE TABLE Alarm (
  Id int primary key,
  TypAlarmu varchar(50) not null,
  Godzina time not null,
  ReaktorId int foreign key references Reaktor(Id)
);

CREATE TABLE Pracownik_Reaktor (
PracwonikId int not null foreign key references Pracownicy(Id),
ReaktorId int not null foreign key references Reaktor(Id)
);

CREATE TABLE Dostawa (
  Id int primary key,
  TypDostawy varchar(30) not null,
  Godzina time,
);