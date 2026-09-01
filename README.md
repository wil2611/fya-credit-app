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
- Buscar créditos por nombre del cliente.
- Buscar créditos por cédula o ID.
- Buscar créditos por comercial.
- Ordenar créditos por fecha de registro.
- Ordenar créditos por valor del crédito.
- Validar los datos del formulario antes de enviarlos.
- Mostrar estados de carga y errores.
- Consumir la API REST del backend.

## Consulta de créditos

La pantalla principal permite filtrar los créditos por:

- Nombre del cliente.
- Cédula o ID.
- Comercial.

También permite ordenar los resultados por:

- Fecha de registro.
- Valor del crédito.

El orden puede ser ascendente o descendente.

Los filtros y el ordenamiento son enviados al backend mediante parámetros de consulta.

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
