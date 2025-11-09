# Biblioteca Backend

## Descripción
Este proyecto es el backend de una aplicación de gestión de biblioteca, desarrollado con Node.js y Express. Proporciona una API RESTful para gestionar recursos (libros, películas, revistas) y usuarios (administradores, socios). La base de datos utilizada es MySQL.

## Tecnologías Utilizadas
*   **Node.js**: Entorno de ejecución para JavaScript.
*   **Express.js**: Framework web para Node.js, utilizado para construir la API RESTful.
*   **MySQL**: Sistema de gestión de bases de datos relacionales.
*   **Docker & Docker Compose**: Para la orquestación y gestión de los contenedores de la aplicación y la base de datos.
*   **Nodemon**: Herramienta para el desarrollo que reinicia automáticamente el servidor al detectar cambios.
*   **dotenv**: Para la gestión de variables de entorno.

## Configuración del Entorno

### Requisitos Previos
Asegúrate de tener instalado lo siguiente:
*   Docker
*   Docker Compose

### Pasos para la Configuración
1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd biblioteca_backend
    ```
2.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables (ejemplo):
    ```
    DB_HOST=db
    DB_USER=root
    DB_PASSWORD=123
    DB_NAME=biblioteca
    DB_PORT=3306
    NODE_ENV=development
    PORT=3000
    ```
    *Nota: `DB_HOST` debe ser `db` si estás usando Docker Compose, ya que es el nombre del servicio de la base de datos en `docker-compose.yml`.*

3.  **Iniciar los servicios con Docker Compose:**
    ```bash
    docker-compose up --build -d
    ```
    Esto construirá las imágenes (si es necesario), creará los contenedores para la aplicación Node.js y la base de datos MySQL, y los iniciará en segundo plano. La base de datos se inicializará automáticamente con el script `db/script.sql`.

4.  **Instalar dependencias (si no usas Docker para el entorno de desarrollo):**
    Si prefieres ejecutar la aplicación Node.js directamente en tu máquina local (fuera de Docker para desarrollo), primero instala las dependencias:
    ```bash
    npm install
    ```

## Uso

### Ejecutar la aplicación (Modo Desarrollo - Local)
Si has instalado las dependencias localmente y quieres usar `nodemon`:
Necesitarás una instalación de mysql local, ya sea instalado o en un contenedor docker y configurar el .env para que apunte a localhost.
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### Ejecutar la aplicación (Modo Producción - Docker)
Si los servicios de Docker Compose están corriendo, la aplicación ya está en ejecución.
La aplicación estará disponible en `http://localhost:3000`.

