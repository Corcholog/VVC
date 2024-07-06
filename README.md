# VVC

Buscador de productos veganos, vegetarianos y celiacos con un mapa.

## Configuración

### Variables de entorno

Este proyecto utiliza un archivo `.env` para configurar variables de entorno. 

Sigue estos pasos para configurar tu entorno de desarrollo:

1. Crea un archivo `.env` en la raíz de tu proyecto.
2. Copia y pega el siguiente contenido en el archivo `.env` y ajusta los valores según sea necesario:

```plaintext
# Configuración del servidor
PORT=3000

# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=postgres
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# Clave secreta para JWT
SECRET_KEY=tu_clave_secreta

# Token API de Mapbox
VITE_MAPBOX_ACCESS_TOKEN=tu_token_de_acceso_mapbox
