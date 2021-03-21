/**
 * Estratégia usada para autenticar usando LinkedIn
 */
const LinkedinStratey = require('passport-linkedin-oauth2').Strategy
const User = require('../../models/User')

module.exports = function(passport){
  passport.use(new LinkedinStratey({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: '/auth/linkedin/done',
    scope: ['r_liteprofile'],
    state: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ userID: profile.id })
      if (user) {
        done(null, user)
      } else {
        user = await User.create({
          userID: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value
        })
        done(null, user)
      }
    } catch (error) {
      console.log(error)
    }
  } 
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}