# prueba-tecnica-tareas
prueba tecnica tareas

# BASE DE DATOS

Dentro de la carpeta BD se encuentra el db.bak. Importar este archivo desde sql management studio.

# BACKEND
El backend se encuentra en la carpeta "prueba-tecnica-denario". Nos ubicamos dentro de la carpeta con la terminal y se ejecuta
```BASH
npm i
```

Configurar .env (tomar .env.example) y configurar con sus credenciales de acceso a la base de datos.
Ejecutar proyecto con el comando
```BASH
npm run dev
```

# FRONTEND
El frontend se encuentra en la carpeta "prueba-tecnica-denario-react". Nos ubicamos dentro de la carpeta con la terminal y se ejecuta
```BASH
npm i
```
NOTA: En el archivo axios.ts editar la línea número 3 (axios.defaults.baseURL =  'http://localhost:3026/api';). Se reemplaza el puerto por el que se esté ejecutando el backend.

Ejecutar proyecto con el comando
```BASH
npm run dev
```