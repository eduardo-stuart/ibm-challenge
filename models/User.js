/**
 * Modelo para registrar no banco de dados os usuários que ingressaram no sistema
 */
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userID: {
    type: String, 
    required: true
  },
  displayName: {
    type: String, 
    required: true
  },
  image: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema) 