const router = require('express').Router()
const { somenteAutorizados, somenteVisitantes } = require('../middleware/auth')
const Consulta = require('../models/Consulta')

const axios = require('axios').default

// A tela de login somente será exibida para os usuários não identificados
// Os demais serão encaminhados para a tela de consultas
router.get('/', somenteVisitantes, (req, res) => {
  res.render('index', { titulo: 'Login', user: req.user })
})

// Tela onde o usuário poderá realizar as suas consultas e conferir os últimos termos consultados
router.get('/consultas', somenteAutorizados, async (req, res) => {
  // Gera uma lista com as últimas vinte consutas feitas pelo usuário
  const anteriores = await Consulta
                            .find({ user: req.user.userID })
                            .sort([[ "dataPesquisa", -1]])
                            .limit(20)
  res.render('consultas', { titulo: 'Consultas', user: req.user, anteriores })
})

// Exibe os resultados da pesquisa realizada
router.post('/pesquisar', somenteAutorizados, async (req, res) => {
  const termos = req.body.termos
  if (!termos) res.redirect('/consultas')
  try {
    const resultados = await axios.get(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${termos}&site=stackoverflow`)
    // Registra essa consulta no banco de dados
    await Consulta.create({
      user: req.user.userID,
      termo: termos
    })
    res.render('resultados', { titulo: 'Resultados', termos, resultados: resultados.data, user: req.user })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// Encerra a sessão do usuário, retornando para a tela de login
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router