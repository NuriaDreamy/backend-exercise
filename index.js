const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
  });

// Rutas de la API
app.use("/usuarios", userRoutes);
app.use("/task", taskRoutes);
app.use("/category", categoryRoutes);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Usuarios y Tareas con relaciones",
    endpoints: {
      usuarios: "/usuarios",
      tareas: "/task",
      categorias: "/category",
    },
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
});
