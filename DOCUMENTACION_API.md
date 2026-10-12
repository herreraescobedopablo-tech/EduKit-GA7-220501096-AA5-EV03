
# DOCUMENTACIÓN DE SERVICIOS WEB - EDUKIT

## 1. Información general

**Proyecto:** EduKit  
**Evidencia:** GA7-220501096-AA5-EV03  
**Aprendiz:** Pablo Herrera  
**Tecnologías:** Node.js, Express y Postman.

## 2. Descripción

EduKit es una plataforma que busca conectar a personas que desean donar útiles escolares y otros artículos con personas que los necesitan.

La API permite registrar usuarios, iniciar sesión y administrar publicaciones de donaciones.

## 3. Instalación y ejecución

1. Instalar Node.js.
2. Abrir la terminal en la carpeta del proyecto.
3. Ejecutar `npm install`.
4. Ejecutar `node src/app.js`.
5. Abrir Postman para probar los servicios.

La API funciona localmente en `http://localhost:3000`.

## 4. Servicios disponibles

### 4.1 Verificar el funcionamiento

- Método: GET
- Endpoint: `/`
- Respuesta: 200 OK.
- Función: comprobar que la API está activa.

### 4.2 Registrar usuario

- Método: POST
- Endpoint: `/api/registro`
- Datos: `usuario` y `contrasena`.
- Respuesta exitosa: 201 Created.
- Errores: 400 Bad Request si faltan campos y 409 Conflict si el usuario ya existe.

Ejemplo:

```json
{
  "usuario": "pablo",
  "contrasena": "123456"
}
```

### 4.3 Iniciar sesión

- Método: POST
- Endpoint: `/api/login`
- Datos: `usuario` y `contrasena`.
- Respuesta exitosa: 200 OK.
- Error: 401 Unauthorized si las credenciales no coinciden.

### 4.4 Consultar usuarios

- Método: GET
- Endpoint: `/api/usuarios`
- Respuesta: 200 OK.
- Función: consultar los usuarios registrados sin mostrar sus contraseñas.

### 4.5 Consultar donaciones

- Método: GET
- Endpoint: `/api/donaciones`
- Respuesta: 200 OK.
- Función: obtener todas las donaciones registradas.

### 4.6 Consultar una donación

- Método: GET
- Endpoint: `/api/donaciones/:id`
- Ejemplo: `/api/donaciones/1`
- Respuestas: 200 OK si existe y 404 Not Found si no existe.

### 4.7 Crear una donación

- Método: POST
- Endpoint: `/api/donaciones`
- Respuesta exitosa: 201 Created.
- Error: 400 Bad Request si los datos son inválidos.

Ejemplo:

```json
{
  "titulo": "Cuadernos escolares",
  "descripcion": "Cuadernos nuevos para estudiantes",
  "categoria": "Útiles escolares",
  "cantidad": 20,
  "ubicacion": "Chía, Cundinamarca",
  "donante": "Pablo"
}
```

### 4.8 Actualizar una donación

- Método: PUT
- Endpoint: `/api/donaciones/:id`
- Respuesta exitosa: 200 OK.
- Errores: 400 Bad Request si los datos no son válidos y 404 Not Found si no existe la donación.

### 4.9 Eliminar una donación

- Método: DELETE
- Endpoint: `/api/donaciones/:id`
- Respuesta exitosa: 200 OK.
- Error: 404 Not Found si no existe la donación.

## 5. Pruebas realizadas

Se probaron los siguientes servicios con Postman:

- Consulta de todas las donaciones.
- Creación de una donación.
- Consulta de una donación por su ID.
- Actualización de una donación.
- Eliminación de una donación.

Las pruebas anteriores finalizaron con los códigos HTTP esperados.

## 6. Almacenamiento de información

En esta versión se utilizan arreglos en memoria para almacenar usuarios y donaciones. Por esta razón, los datos se eliminan cuando se reinicia el servidor.

## 7. Conclusión

Se desarrolló una API para EduKit utilizando Node.js y Express. Los servicios permiten realizar operaciones de registro, autenticación y administración de donaciones mediante solicitudes HTTP.
