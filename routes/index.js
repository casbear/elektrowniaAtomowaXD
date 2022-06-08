const express = require('express')
const req = require('express/lib/request')
const sql = require('mssql')
const router = express.Router()
const { request } = require('../database')

async function getbasicinfo(req, res) {

  try {
    const dbRequest = await request()
    let result;
    result = await dbRequest.query('SELECT * FROM Reaktor');
    reactor = result.recordset;
    console.log(reactor)
  } catch (err) {
    console.error('Problem z pobraniem informacji reaktora', err)
  }

  res.render('MainConsole', { 
    reactor: reactor
   })
}

async function getalarminfo(req, res) {

  try {
    const dbRequest = await request()
    let result;
    result = await dbRequest.query('SELECT * FROM Alarm');
    alarms = result.recordset;
    console.log(alarms)
  } catch (err) {
    console.error('Problem z pobraniem informacji alarmow', err)
  }

  res.render('alarms', { 
    alarms: alarms
   })
}

async function getworkerInfo(req, res) {

  try {
    const dbRequest = await request()
    let result;
    result = await dbRequest.query('SELECT * FROM Pracownik');
    workers = result.recordset;
    console.log(workers)
  } catch (err) {
    console.error('Problem z pobraniem informacji pracownika', err)
  }

  res.render('workers', { 
    workers: workers
   })
}

async function getdeliveryinfo(req, res) {

  try {
    const dbRequest = await request()
    let result;
    result = await dbRequest.query('SELECT * FROM Dostawa');
    delivery = result.recordset;
    console.log(delivery)
  } catch (err) {
    console.error('Problem z pobraniem informacji dostaw', err)
  }

  res.render('deliveries', { 
    delivery : delivery
   })
}


async function showNewProductForm(req, res) {
  res.render('new-product', { title: 'Nowy produkt' })
}

async function addNewProduct(req, res, next) {
  try {
    const dbRequest = await request()
    await dbRequest
      .input('Nazwa', sql.VarChar(50), req.body.nazwa)
      .input('Kategoria', sql.VarChar(50), req.body.kategoria)
      .input('Cena', sql.Money, parseFloat(req.body.cena))
      .input('Ilosc', sql.SmallInt, parseInt(req.body.ilosc, 10))
      .query('INSERT INTO Produkty VALUES (@Nazwa, @Kategoria, @Ilosc, @Cena)')

    res.message = 'Dodano nowy produkt'
  } catch (err) {
    console.error('Nie udało się dodać produktu', err)
  }

  showProducts(req, res)
}

async function deleteProduct(req, res) {

  try {
    const dbRequest = await request()

    await dbRequest
      .input('Id', sql.INT, req.params.id)
      .query('DELETE FROM Produkty WHERE Id = @Id')
  } catch (err) {
    console.error('Nie udało się usunąć produktu', err)
  }

  res.message = `Usunięto produkt o id ${req.params.id}`;

  showProducts(req, res)
}

async function showLoginForm(req, res) {
  res.render('login', { title: 'Logowanie' })
}

async function login(req, res) {
  const {login, password} = req.body;

  try {
    const dbRequest = await request()

    const result = await dbRequest
      .input('Login', sql.VarChar(50), login)
      .input('Haslo', sql.VarChar(50), password)
      .query('SELECT Login FROM Uzytkownicy WHERE Login = @Login AND Haslo = @Haslo')
  
    if (result.rowsAffected[0] == 1) {
      req.session.userLogin = login;
      showProducts(req, res);
    } else {
      res.render('login', {title: 'Logownie', error: 'Logowanie nieudane'})
    }
  } catch (err) {
    res.render('login', {title: 'Logownie', error: 'Logowanie nieudane'})
  }

}

function logout(req, res) {
  req.session.destroy();

  showProducts(req, res);
}

router.get('/', getbasicinfo);
router.get('/workers', getworkerInfo);
router.get('/alarms', getalarminfo);
router.get('/deliveries', getdeliveryinfo);
router.get('/login', showLoginForm);
router.post('/login', login);
router.post('/logout', logout); 

module.exports = router;