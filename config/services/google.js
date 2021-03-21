/**
 * Estratégia usada para autenticar usando Google
 */
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../models/User')

module.exports = function(passport){
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/done'
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