//setting up the app

const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const yaml = require('js-yaml')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000
const mysql = require('mysql8.0')
const { STRING } = require('mysql8.0/lib/protocol/constants/types')

let config
try {
  const fileContents = fs.readFileSync('./config.yaml', 'utf8')
  config = yaml.load(fileContents)
} catch (e) {
  console.log('unable to read config.yaml')
}

// Create the connection to mysql (the data itself is from "config.yaml")
const dbConn = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_name,
  port: config.db_port
})

// connect to mysql db
dbConn.connect((err) => {
  if (err) throw err
  console.log('Mysql Connected, we are ready to go!, have fun :)')
})

app.set('views', path.join(__dirname, 'views/recipes'))
app.set('view engine', 'ejs')

app.get('/', function (req, res, next) {
  dbConn.query('SELECT * FROM `recipes` ', function (err, rows) {
    if (err) {
      // render to views/recipes/index.ejs
      res.render('index', { data: '' })
    } else {
      // render to views/recipes/index.ejs
      res.render('index', { data: rows })
    }
  })
})

app.get('/add', function (req, res, next) {
  // render to add.ejs
  res.render('add', {
    name: '',
    ethnic: '',
    ingredients: '',
    preparation: ''  

  })
})

// add new recipe
app.post('/add', function (req, res, next) {
  const name = req.body.name
  const ethnic = req.body.ethnic
  const ingredients = req.body.ingredients
  const preparation = req.body.preparation

  const formData = {
    name: name,
    ethnic: ethnic,
    ingredients: ingredients,
    preparation: preparation

  }

  // insert query
  dbConn.query('INSERT INTO `recipes` SET ?', formData, function (err, result) {
    if (err) {
      console.error("Couldn't add recipe: " + err)
      // render to add.ejs
      res.render('add', {
        name: formData.name,
        ethnic: formData.ethnic,
        ingredients: formData.ingredients,
        preparation: formData.preparation
      })
    } else {
      console.log('recipe ' + name + 'was added to DB successfully')
      res.redirect('/')
    }
  })
})

// display edit recipe page
app.get('/edit/(:id)', function (req, res, next) {
  const id = req.params.id

  dbConn.query('SELECT * FROM `recipes` WHERE `id` = ' + id, function (err, rows, fields) {
    if (err) throw err

    // if recipe not found
    if (rows.length <= 0) {
      console.error('recipe not found with id = ' + id)
      res.redirect('/')
    } else { // if recipe found
      // render to edit.ejs
      res.render('edit', {
        title: 'Edit Recipe',
        id: rows[0].id,
        name: rows[0].name,
        ethnic: rows[0].ethnic,
        ingredients: rows[0].ingredients,
        preparation: rows[0].preparation
      })
    }
  })
})

// update recipe data
app.post('/update/:id', function (req, res, next) {
  const id = req.params.id
  const name = req.body.name
  const ethnic = req.body.ethnic
  const ingredients = req.body.ingredients
  const preparation = req.body.preparation

  const formData = {
    name: name,
    ethnic: ethnic,
    ingredients: ingredients,
    preparation: preparation
  }
  // update query
  dbConn.query('UPDATE `recipes` SET ? WHERE `id` = ' + id, formData, function (err, result) {
    // if(err) throw err
    if (err) {
      // set flash message
      console.error(err)
      // render to edit.ejs
      res.render('edit', {
        id: req.params.id,
        name: formData.name,
        ethnic: formData.ethnic,
        ingredients: formData.ingredients,
        preparation: formData.preparation,
      })
    } else {
      console.log('recipe successfully updated')
      res.redirect('/')
    }
  })
})

// delete recipe
app.get('/delete/(:id)', function (req, res, next) {
  const id = req.params.id

  dbConn.query('DELETE FROM `recipes` WHERE `id` = ' + id , function (err, result) {
    // if(err) throw err
    if (err) {
      // set flash message
      console.error(err)
      // redirect to recipes page
      res.redirect('/')
    } else {
      // set flash message
      console.log('recipe successfully deleted! id = ' + id)
      // redirect to recipes page
      res.redirect('/')
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
