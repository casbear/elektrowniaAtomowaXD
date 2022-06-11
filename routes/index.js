const { raw } = require('express')
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
    console.log("getalarm has launched")
      if(req.query.alarm_control) {
        console.log("if(req.query.alarm_control) has been triggered, now proceding to switch")
        switch (req.query.alarm_control) 
        {
          case 'Niski':
          case 'Sredni':
          case 'Wysoki':
            result = await dbRequest
            .input('Priorytet', sql.VarChar(50), req.query.alarm_control)
            .query('SELECT * FROM Alarm WHERE TypAlarmu like @Priorytet')
            console.log(req.query.alarm_control + " hey?")
            break;
          case 'Godzina':
            result = await dbRequest.query('SELECT * FROM Alarm WHERE DATEDIFF(HOUR,GETDATE(), Godzina) = 0')
            console.log('Godzina')
            break;
          case 'Dzien':
            result = await dbRequest.query('SELECT * FROM Alarm WHERE DAY(GETDATE()) = DAY(Godzina)')
            console.log('Dzien')
            break;
          case 'Tydzien':
            result = await dbRequest.query('SELECT * FROM Alarm WHERE DATEDIFF(WEEK,GETDATE(), Godzina) = 0')
            console.log('Tydzien')
            break;
          case 'Miesiac':
            result = await dbRequest.query('SELECT * FROM Alarm WHERE DATEDIFF(MONTH,GETDATE(), Godzina) = 0')
            console.log("Miesiac")
            break;
         
          case '1':
          case '2':
          case '3':
          case '4':
            result = await dbRequest
            .input('ReaktorId', sql.Int, req.query.alarm_control)
            .query('Select * FROM Alarm WHERE ReaktorId = @ReaktorId')
            break;
        }
      }
      else 
      {
        result = await dbRequest.query('SELECT * FROM Alarm')
      }
    alarms = result.recordset;
    console.log(alarms)
  } catch (err) {
    console.error('Problem z pobraniem informacji alarmow', err)
  }

  res.render('alarms', { 
    alarms: alarms
   })

}
async function sendtoterminal(req, res, next) {
  try {
    console.log('hey i work!')
    console.log('hey, action control is not empty!!')
    switch(req.query.action_control)
    {
        
      case 'insert':
        if(req.body.arg1 == 'Alarm')
        {
          const dbRequest = await request()
          await dbRequest
          .input('tablename', sql.VarChar, req.body.arg1)
          .input('value1', sql.VarChar, req.body.arg2)
          .input('value2', sql.VarChar, req.body.arg3)
          .input('value3', sql.VarChar, req.body.arg4)
          .query('INSERT INTO @tablename values(value1,value2,value3);')
          console.log('insert launched')
          res.message ='dodano'
        }
        
        else if(req.body.arg1 == 'Pracownik')
        {
          const dbRequest = await request()
          await dbRequest
          .input('tablename', sql.VarChar, req.body.arg1)
          .input('value1', sql.VarChar, req.body.arg2)
          .input('value2', sql.VarChar, req.body.arg3)
          .input('value3', sql.VarChar, req.body.arg4)
          .input('value4', sql.VarChar, req.body.arg5)
          .query('INSERT INTO @tablename values(value1,value2,value3,value4);')
          console.log('insert lauched')
          res.message = 'dodano'
        }
        
      case 'delete':
        if(req.body.arg1 == 'Alarm' || 'Pracownik')
        {
          const dbRequest = await request()
          await dbRequest
          .input('tablename', sql.VarChar, req.body.arg1)
          .input('value1', sql.VarChar, req.body.arg2)
          .input('value2', sql.VarChar, req.body.arg3)
          .input('value3', sql.VarChar, req.body.arg4)
          .query('DELETE FROM  @tablename WHERE value1 = value2;')
          res.message = 'usunieto'
        }
        console.log("hey i switched!!")
      }
  }
  catch (err) {
    console.error('Problem z pobraniem informacji terminalu', err)
  }
  getterminal(req, res)
}

async function add_alarm(req, res)
{
  res.render('new_alarm')
}
async function del_alarm(req, res)
{
  res.render('delete_alarm')
}
async function add_worker(req, res)
{
  res.render('new_worker')
}
async function del_worker(req, res)
{
  res.render('delete_worker')
}
async function post_alarm_add(req, res, next)
{
  try 
  {
    const dbRequest = await request()
    await dbRequest
      .input('Priotity', sql.VarChar, req.body.arg_aa1)
      .input('Date', sql.DateTime, req.body.arg_aa2)
      .input('Reaktor', sql.Int, req.body.arg_aa3)
      .query('INSERT INTO Alarm VALUES (@Priority, @Date, @Reaktor)')
  }
  catch (err) 
  {
    console.log(err)
  }
  getterminal(req, res)
}
async function post_worker_add(req, res, next)
{
  try 
  {
    const dbRequest = await request()
    await dbRequest
      .input('Imie', sql.VarChar, req.body.arg_aw1)
      .input('Nazwisko', sql.VarChar, req.body.arg_aw2)
      .input('StanRoboczy', sql.Bit, req.body.arg_aw3)
      .input('Stanowisko', sql.VarChar, req.body.arg_aw4)
      .query('INSERT INTO Pracownik VALUES (@Imie, @Nazwisko, @StanRoboczy, @Stanowisko)')
  }
  catch (err) 
  {
    console.log(err)
  }
  getterminal(req, res)
}
async function post_alarm_del(req, res, next)
{
  try
  {
    const dbRequest = await request()
    await dbRequest
      .input('column', sql.VarChar, req.body.arg_ad1)
      .input('condition', sql.VarChar, req.body.arg_ad2)
  }
  catch (err) 
  {
    console.log(err)
  }
  getterminal(req, res)
}

async function getterminal(req, res)
{
  res.render('terminal')
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

router.get('/terminal', getterminal)
router.post('/new_alarm', post_alarm_add);
router.get('/new_alarm', add_alarm)
router.get('/', getbasicinfo);
router.get('/workers', getworkerInfo);
router.get('/alarms', getalarminfo);
router.get('/deliveries', getdeliveryinfo);
router.get('/login', showLoginForm);
router.post('/logout', logout); 

module.exports = router;