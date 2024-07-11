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
        database: 'Catalogo'
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
    res.render('add_Products')
})

app.post('/add_Product', (req, res) => {
    const {name, quantity, price} = req.body

    if (!name || !quantity || !price) {
        return res.status(400).send('Todos os Campos são Obrigatóris!!!')
    }
    let sql = 'INSERT INTO products (nome, quantity, price) VALUES (?, ?, ?)'

    db.query(sql, [name, quantity, price], (err, result) => {
        if(err) {
            throw err
        }
        console.log('Produto Adicionado!!!')
        res.redirect('/products')
    })
})

app.get('/products', (req, res) => {
    let sql = 'SELECT * FROM products'
    db.query(sql, (err, result) => {
        if(err) {
            throw err
        }
        res.render('list_Products', {products: result})
    })
})

app.get('/delete_product/:id', (req, res) => {
    const {id} = req.params
    let sql = 'DELETE FROM products WHERE id=?'
    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err
        }
        console.log('Produto Apagado!!!', result)
        res.redirect('/products')
    })
})

app.get('/edit_product/:id', (req, res) => {
    const {id} = req.params
    let sql = 'SELECT * FROM products WHERE id=?'
    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err
        }
        res.render('edit_Products', {prod: result[0]})
    })
})

app.post('/edit_product/:id', (req, res) => {
    const {id} = req.params
    const {name, quantity, price} = req.body
    let sql = 'UPDATE products SET nome=?, quantity=?, price=? WHERE id=?'
    db.query(sql, [name, quantity, price, id], (err, result) => {
        if(err) {
            throw err
        }
        res.redirect('/products')
    })
})

app.listen(port, () => {
    console.log('Servidor Conectado...')
})