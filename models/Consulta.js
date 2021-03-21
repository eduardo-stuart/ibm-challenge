/**
 * Modelo usado para registrar as últimas consultas realizadas pelo visitante
 */
const mongoose = require('mongoose')

const ConsultaSchema = new mongoose.Schema({
  termo: {
    type: String,
    required: true
  },
  dataPesquisa: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Consulta', ConsultaSchema) 