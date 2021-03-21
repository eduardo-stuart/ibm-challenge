/**
 * IBM-Challenge
 * Desafio de Programação
 * ---
 * Desenvolvido por Eduardo Stuart
 * https://github.com/eduardo-stuart
 * https://www.linkedin.com/in/eduardo-stuart/
 * 
 * Uma versão operacional desse aplicativo pode ser conferido em:
 * https://ibm-challenge.eduardostuart.pro.br
 * 
 * Seu código-fonte está disponível em 
 * https://github.com/eduardo-stuart/ibm-challenge
 * 
 * 2021
 */
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Todos os métodos de autenticação suportados por esse desafio
require('./config/services/google')(passport)
require('./config/services/twitter')(passport)
require('./config/services/linkedin')(passport)

// Banco de dados NoSQL (MongoDB) usado pelo projeto
connectDB()


const app = express()
// Para lidar com os formulários
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Mecanismo que irá gerar as páginas dinâmicas
app.set('view engine', 'ejs') 
// Ocultar detalhes sobre o servidor
app.use(helmet())

// Seções
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

// Usado para logar os usuários
app.use(passport.initialize())
app.use(passport.session())

// Rotas usadas pelo servidor
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.IBM_CHALLENGE_PORT || 3000

app.listen(
  PORT, 
  console.log(`Servidor operando no modo ${process.env.NODE_ENV}, porta ${PORT}`)
)