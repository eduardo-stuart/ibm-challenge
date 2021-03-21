/**
 * Usado para controlar o acesso às rotas.
 * Por exemplo, há rotas que somente podem ser acessadas por usuários identificados.
 * Se um usuário não identificado tentar acessá-las, será encaminhado para a tela de login 
 */
module.exports = {
  somenteAutorizados: function (req, res, next){
    if(req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/')
    }
  },
  
  somenteVisitantes: function (req, res, next) {
    if(req.isAuthenticated()){
      res.redirect('/consultas')
    } else {
      return next()
    }
  }
}