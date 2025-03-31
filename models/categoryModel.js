const mongoose = require("mongoose");

// Definimos el esquema de tarea
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    // Referencia al usuario propietario (opcional)
    owner: {
      type: mongoose.Schema.Types.ObjectId, // Tipo especial para referencias
      ref: "User", // Modelo al que hace referencia
      required: false, // Campo opcional
    },
  },
  {
    timestamps: true, // Añade campos createdAt y updatedAt automáticamente
  }
);

// Creamos el modelo a partir del esquema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
