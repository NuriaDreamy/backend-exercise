const mongoose = require("mongoose");

// Definimos el esquema de usuario
const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false // No devolver el campo en las consultas
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project", // Referencia a otro modelo (por ejemplo, Project)
      },
    ],
  },
  {
    timestamps: true, // Añade campos createdAt y updatedAt automáticamente
  }
);

// Creamos el modelo a partir del esquema
const User = mongoose.model("User", userSchema);

module.exports = User;
