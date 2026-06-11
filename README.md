# MyApp - ASP.NET Core 8.0 Web API

Una aplicación ASP.NET Core moderna y profesional con las siguientes características:

## Características

- **.NET 8.0** - Última versión LTS del framework
- **Serilog** - Logging estructurado con salida a consola y archivos
- **Swagger/OpenAPI** - Documentación automática de la API
- **Arquitectura limpia** - Separación en Controllers, Services y Models
- **Inyección de dependencias** - Patrón recomendado por Microsoft
- **Docker** - Contenedorización lista para producción
- **Nullable reference types** - Mejor seguridad de tipos

## Estructura del Proyecto

```
MyApp/
├── Controllers/          # Controladores de la API
│   └── WeatherForecastController.cs
├── Models/              # Modelos de datos
│   └── WeatherForecast.cs
├── Services/            # Lógica de negocio
│   └── MyService.cs
├── Properties/          # Configuración de propiedades
├── appsettings/         # Configuraciones adicionales
├── Program.cs           # Punto de entrada de la aplicación
├── MyApp.csproj         # Archivo de proyecto
├── appsettings.json     # Configuración principal
├── appsettings.Development.json  # Configuración de desarrollo
├── Dockerfile           # Configuración de Docker
└── docker-compose.yml   # Orquestación de contenedores
```

## Requisitos Previos

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
- [Docker](https://www.docker.com/) (opcional, para contenedorización)

## Cómo Ejecutar el Proyecto

### Opción 1: Usando .NET CLI

```bash
# Restaurar paquetes
dotnet restore

# Compilar el proyecto
dotnet build

# Ejecutar la aplicación
dotnet run
```

La aplicación estará disponible en:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

### Opción 2: Usando Visual Studio Code

1. Abre la carpeta del proyecto en VS Code
2. Instala la extensión [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
3. Presiona `F5` para iniciar la aplicación con debugging
4. O usa `Ctrl+F5` para ejecutar sin debugging

### Opción 3: Usando Docker

```bash
# Construir y ejecutar con Docker Compose
docker-compose up --build

# O usar solo Docker
docker build -t myapp .
docker run -p 5000:8080 -p 5001:8081 myapp
```

## Endpoints de la API

### GET /api/weatherforecast

Obtiene una lista de pronósticos del tiempo.

**Respuesta de ejemplo:**
```json
[
  {
    "date": "2024-01-15",
    "temperatureC": 25,
    "temperatureF": 77,
    "summary": "Warm"
  }
]
```

## Swagger UI

Cuando ejecutes la aplicación en modo desarrollo, podrás acceder a la documentación interactiva de la API en:

- `http://localhost:5000/swagger`
- `https://localhost:5001/swagger`

## Configuración

### appsettings.json

Configuración principal de la aplicación, incluyendo:
- Niveles de logging
- Configuración de Serilog
- Puertos y hosts permitidos

### appsettings.Development.json

Configuración específica para el entorno de desarrollo con niveles de log más detallados.

## Logging

La aplicación utiliza **Serilog** para logging estructurado. Los logs se escriben en:

- **Consola**: Para ver en tiempo real durante el desarrollo
- **Archivos**: En la carpeta `logs/` con rotación diaria (`logs/app-YYYYMMDD.log`)

## Extensiones Recomendadas para VS Code

- [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- [.NET Install Tool](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

## Próximos Pasos

Puedes extender esta aplicación agregando:

1. **Base de datos**: Entity Framework Core con SQL Server, PostgreSQL o SQLite
2. **Autenticación**: JWT, OAuth2, o Identity
3. **Validación**: FluentValidation para validación de modelos
4. **Testing**: xUnit o NUnit para pruebas unitarias
5. **Health Checks**: Monitoreo del estado de la aplicación
6. **Redis**: Caché distribuida
7. **Message Queue**: RabbitMQ o Azure Service Bus

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta desarrollando con ASP.NET Core!** 🚀
