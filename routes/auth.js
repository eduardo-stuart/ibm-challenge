const router = require('express').Router()
const passport = require('passport')

/**
 * Autenticação via GOOGLE
 */
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/done', passport.authenticate('google', 
  { failureRedirect: '/' }), (req, res) => {
    res.redirect('/consultas')
  }
)

/**
 * Autenticação via TWITTER
 */
router.get('/twitter', passport.authenticate('twitter'))

router.get('/twitter/done', 
  passport.authenticate('twitter', 
  {failureRedirect: '/'}),
  (req, res) => res.redirect('/consultas')
)

/**
 * Autenticacao via LinkedIn
 */
 router.get('/linkedin', passport.authenticate('linkedin'))

 router.get('/linkedin/done', 
   passport.authenticate('linkedin', 
   {failureRedirect: '/',
  successRedirect: '/consultas'})
 )

module.exports = router