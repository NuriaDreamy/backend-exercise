# API de Usuarios y Tareas con Relaciones - Step 3

Este proyecto implementa una API RESTful para gestionar usuarios y tareas con relaciones entre ellas utilizando MongoDB como base de datos. Es una evolución del proyecto anterior que solo tenía la entidad Usuario.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose

## Estructura del proyecto

```
proyecto/
├── controllers/         # Lógica de negocio
│   ├── userController.js
│   └── taskController.js
├── models/              # Esquemas y modelos de datos
│   ├── userModel.js
│   └── taskModel.js
├── routes/              # Definición de rutas API
│   ├── userRoutes.js
│   └── taskRoutes.js
├── .env                 # Variables de entorno (no incluido en el repo)
├── .gitignore
├── index.js             # Archivo principal
├── package.json
└── README.md
```

## Configuración

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` en la raíz del proyecto con:
   ```
   PORT=3000
   MONGODB_URI=<cluster_db_uri>
   ```
4. Sustituir `<cluster_db_uri>` con tu URI para conectarte a MongoDB Atlas (se encuentra en el Dashboard del cluster creado en MongoDB Atlas) y añadir nombre de la base de datos al final de la URI. Ejemplo: `mongodb+srv://nuclio:secret1234@cluster0.vx7ba.mongodb.net/nucliodb`.
5. Iniciar el servidor: `npx nodemon` o `npm run dev`

## Relaciones entre entidades

En este proyecto, hemos implementado una relación unidireccional entre Tareas y Usuarios:

- Una tarea puede tener un propietario (owner) que es un Usuario
- La propiedad `owner` en el modelo Task es una referencia al modelo User
- Esta relación se define mediante:
  ```javascript
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Tipo especial para referencias
    ref: 'User',                          // Modelo al que hace referencia
    required: false                       // Campo opcional
  }
  ```
- Usamos el método `populate()` de Mongoose para obtener la información del propietario al consultar tareas

## Endpoints disponibles

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/usuarios` | Obtener todos los usuarios |
| GET | `/usuarios/:id` | Obtener un usuario específico |
| POST | `/usuarios` | Crear un nuevo usuario |
| PUT | `/usuarios/:id` | Actualizar un usuario |
| DELETE | `/usuarios/:id` | Eliminar un usuario |
| POST | `/usuarios/login` | Iniciar sesión |
| GET | `/usuarios/buscar/:nombre` | Buscar usuarios por nombre (solución del ejercicio anterior) |
| GET | `/usuarios/:id/tasks` | Obtener usuario con sus tareas |

### Tareas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/tareas` | Obtener todas las tareas |
| GET | `/tareas/:id` | Obtener una tarea específica |
| POST | `/tareas` | Crear una nueva tarea |
| PUT | `/tareas/:id` | Actualizar una tarea |
| DELETE | `/tareas/:id` | Eliminar una tarea |
| PUT | `/tareas/:id/assign` | Asignar un propietario a una tarea |
| GET | `/tareas/owner/:ownerId` | Obtener tareas por propietario |

## Ejemplos de peticiones

### Crear un usuario
```
POST /usuarios
Content-Type: application/json

{
  "nombre": "Juan",
  "password": "1234"
}
```

### Crear una tarea
```
POST /tareas
Content-Type: application/json

{
  "titulo": "Completar proyecto",
  "descripcion": "Terminar el proyecto de MongoDB para Nuclio"
}
```

### Asignar un propietario a una tarea
```
PUT /tareas/60d21b4667d0d8992e610c85/assign
Content-Type: application/json

{
  "ownerId": "60d21b4667d0d8992e610c80"
}
```

### Obtener usuario con sus tareas
```
GET /usuarios/60d21b4667d0d8992e610c80/tasks
```

## Ejercicio propuesto

Implementar una nueva entidad Categoría con un CRUD básico y relacionarla con las tareas:

1. Crear un modelo `categoryModel.js` con los siguientes campos:
   - nombre (String, requerido)
   - descripcion (String)

2. Crear un controlador `categoryController.js` con las operaciones básicas:
   - getCategories (obtener todas)
   - getCategoryById (obtener por ID)
   - createCategory (crear nueva)
   - updateCategory (actualizar existente)
   - deleteCategory (eliminar)

3. Crear las rutas para categorías en `categoryRoutes.js`

4. Modificar el modelo de Tarea para incluir una referencia a Categoría (campo opcional):
   ```javascript
   category: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Category',
     required: false
   }
   ```

5. Implementar un endpoint para asignar una categoría a una tarea:
   - `PUT /tareas/:id/category` que reciba el ID de la categoría

6. Implementar un endpoint para obtener tareas por categoría:
   - `GET /tareas/category/:categoryId`

Pista: Puedes basarte en la implementación de Tareas y su relación con Usuarios.

## Recursos adicionales

- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/docs/)
- [Mongoose: Populate](https://mongoosejs.com/docs/populate.html)
- [Guía de Express](https://expressjs.com/es/guide/routing.html)