# FYA Credit App

Aplicación móvil desarrollada para la prueba técnica de registro y consulta de créditos.

## Tecnologías

- Ionic
- React
- TypeScript
- Capacitor

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- Ionic CLI

## Instalación

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación en desarrollo:

```bash
ionic serve
```

La aplicación normalmente estará disponible en:

```text
http://localhost:8100
```

## Backend

La aplicación consume la API del proyecto:

```text
fya-credit-api
```

El backend se encuentra desarrollado con .NET 8 y PostgreSQL.

## Funcionalidades implementadas

- Registrar créditos.
- Consultar créditos registrados.
- Validar los datos del formulario antes de enviarlos.
- Mostrar estados de carga y errores.
- Conectarse con la API de créditos.

## Flujo de registro

Al registrar un crédito desde la aplicación:

1. El frontend valida los campos.
2. Se envía la información al backend mediante `POST /api/credits`.
3. El backend almacena el crédito en PostgreSQL.
4. Se genera una notificación por correo en segundo plano.
5. La aplicación vuelve al listado de créditos.

## Android

Capacitor será utilizado para generar la versión Android de la aplicación.

El entregable final incluirá un archivo APK o AAB para realizar las pruebas correspondientes.

## Estado del proyecto

Proyecto actualmente en desarrollo como parte de una prueba técnica.
