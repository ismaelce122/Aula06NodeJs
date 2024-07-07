const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const path = require('path')
const port = 3000

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 0
    }
)
db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('MySQL Conectado...')
})

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get('/add_Product', (req, res) => {
    res.render('add_Product')
})

app.post('/add_Product') // Configurar o Mysql

app.get('/products', (req, res) => {
    // Configurar Mysql


    res.render('list_Products') // Configurar Objeto
})

app.listen(port, () => {
    console.log('Servidor Conectado...')
})