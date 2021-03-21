/**
 * Estratégia usada para autenticar usando Twitter
 */
const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../../models/User')

module.exports = function(passport){
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITER_API_SECRET_KEY,
    callbackURL: '/auth/twitter/done'
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