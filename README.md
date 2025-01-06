# Back-Order-Manager

Este proyecto es una aplicación backend diseñada para la gestión de pedidos, desarrollada en **Node.js** y estructurada siguiendo el patrón **MVC** (Modelo-Vista-Controlador). Proporciona una API REST que permite realizar operaciones CRUD sobre entidades como clientes, pedidos, estados y usuarios.

---

## **Arquitectura del Proyecto**

### **Patrón MVC**
El proyecto está diseñado siguiendo el patrón **MVC**, lo que asegura una separación clara de responsabilidades:

1. **Modelo**:
   - Se encuentra en el archivo `config/bd.js`, que gestiona la conexión a la base de datos y las consultas SQL.
   - Responsable de interactuar con la base de datos MySQL para leer y escribir datos.

2. **Controlador**:
   - La lógica de negocio está encapsulada en los controladores, ubicados en la carpeta `controllers/`. Por ejemplo:
     - `authController.js`: Maneja la autenticación.
     - `orderController.js`: Gestiona las operaciones CRUD para pedidos.
   - Los controladores procesan las solicitudes entrantes, interactúan con los modelos y envían respuestas al cliente.

3. **Vista**:
   - Este backend no genera vistas tradicionales (HTML). En su lugar, proporciona respuestas JSON que son consumidas por el frontend.

4. **Rutas**:
   - Las rutas están definidas en la carpeta `routes/` y conectan las solicitudes HTTP con los controladores correspondientes. Por ejemplo:
     - `authRoutes.js`: Define los endpoints relacionados con la autenticación.
     - `clientRoutes.js`: Define los endpoints para la gestión de clientes.

5. **Middleware**:
   - Contiene funciones intermedias como `authMiddleware.js`, que se encargan de validar tokens de autenticación antes de procesar las solicitudes.

---

## **Estructura del Proyecto**

```plaintext
back-order-manager/
├── config/
│   └── bd.js              # Configuración de la base de datos
├── controllers/
│   ├── authController.js  # Controlador de autenticación
│   ├── chartController.js # Controlador de gráficos
│   ├── clientController.js# Controlador de clientes
│   ├── orderController.js # Controlador de pedidos
│   ├── stateController.js # Controlador de estados
│   └── userController.js  # Controlador de usuarios
├── middleware/
│   └── authMiddleware.js  # Middleware de autenticación
├── routes/
│   ├── authRoutes.js      # Rutas para autenticación
│   ├── clientRoutes.js    # Rutas para clientes
│   ├── orderRoutes.js     # Rutas para pedidos
│   └── stateRoutes.js     # Rutas para estados
├── .env                    # Variables de entorno
├── index.js                # Punto de entrada de la aplicación
├── package.json            # Configuración de dependencias
└── README.md               # Documentación del proyecto
```

---

## **Requisitos Previos**

Antes de levantar el proyecto localmente, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** (administrador de paquetes de Node.js)

---

## **Instalación y Configuración Local**

### **1. Clonar el Repositorio**
Clona este repositorio en tu máquina local:

```bash
git clone <url-del-repositorio>
cd back-order-manager
```

### **2. Instalar Dependencias**
Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno necesarias. Aquí tienes un ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=gestor_pedidos
JWT_SECRET=clave_secreta
```

### **4. Crear la Base de Datos**
Configura tu base de datos MySQL:

1. Crea la base de dtos:

   ```sql
   CREATE DATABASE gestor_pedidos;
   USE gestor_pedidos;
   ```

2. Ejecut los scripts SQL de creación de tablas e inserción de datos iniciales (si los tienes).

### **5. Levantar el Servidor**
Levanta el servidor en modo desarrollo o producción:

- **Modo Desarrollo:**

   ```bash
   npm run dev
   ```

- **Modo Producción:**

   ```bash
   npm start
   ```

El servidor estará disponible en `http://localhost:3000`.
Y remotamente en `https://order-manager-api-mk4x.onrender.com/api/`

---

## **Pruebas Locales**

### **Probar Endpoints**
Usa herramientas como **Postman** o **cURL** para probar los endpoints definidos en el proyecto. Ejemplos:

- Obtener clientes:
  ```http
  GET /api/clients
  ```
- Crear un pedido:
  ```http
  POST /api/orders
  ```
  
### **Documentación de la API**
Puedes consultar la documentación completa de los endpoints en el siguiente enlace de Postman:

[Documentación de la API en Postman](https://documenter.getpostman.com/view/26769075/2sAYJ9AyCF)


### **Conectar con el Frontend**
Si tienes un frontend desarrollado con Vite, asegúrate de configurar la URL base para apuntar al backend (`http://localhost:3000`).

---

## **Tecnologías Usadas**

- **Node.js**: Plataforma de ejecución.
- **Express.js**: Framework para crear el servidor.
- **MySQL**: Base de datos relacional.
- **JWT**: Manejo de autenticación.
- **dotenv**: Gestión de variables de entorno.
- **nodemon**: Herramienta para desarrollo en caliente.

---



