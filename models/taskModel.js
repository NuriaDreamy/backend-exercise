const mongoose = require('mongoose');

// Definimos el esquema de tarea
const taskSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  },
  // Referencia al usuario propietario (opcional)
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Tipo especial para referencias
    ref: 'User',                          // Modelo al que hace referencia
    required: false                       // Campo opcional
  }
}, {
  timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

// Creamos el modelo a partir del esquema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;