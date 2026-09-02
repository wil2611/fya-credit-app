
# FYA Credit App

Aplicación móvil desarrollada para la prueba técnica de registro y consulta de créditos de FYA Social Capital.

El proyecto utiliza Ionic + React + TypeScript para la interfaz y Capacitor para generar la aplicación Android. La aplicación consume una API REST desarrollada en .NET y desplegada públicamente.

## Tecnologías

* Ionic
* React
* TypeScript
* Vite
* Capacitor
* Android

## Requisitos

Para ejecutar el proyecto se necesita:

* Node.js
* npm
* Ionic CLI
* Android Studio, para trabajar con Android
* Android SDK, para compilar la aplicación móvil
* Java 21, para la compilación con Gradle

## Instalación

Instalar las dependencias:

```
npm install
```

## Configuración del backend

La URL del backend se obtiene desde la variable de entorno:

```
VITE_API_URL
```

Los archivos de entorno reales no se almacenan en el repositorio. Se incluyen archivos de ejemplo:

```
.env.development.example
.env.android.example
```

### Desarrollo web local

Crear un archivo `<span>.env.development</span>` con:

```
VITE_API_URL=http://localhost:5136
```

### Android con backend local

Para desarrollo con un dispositivo físico y ADB reverse se puede usar un archivo `<span>.env.android</span>` con:

```
VITE_API_URL=http://localhost:5136
```

### Backend desplegado

El backend de producción está disponible en:

```
https://fya-credit-api-production.up.railway.app
```

Para generar una versión Android que consuma el backend desplegado, `<span>.env.android</span>` debe contener:

```
VITE_API_URL=https://fya-credit-api-production.up.railway.app
```

Los archivos `<span>.env*</span>` reales deben mantenerse fuera del repositorio.

## Ejecución local

Ejecutar la aplicación web:

```
ionic serve
```

Normalmente estará disponible en:

```
http://localhost:8100
```

El backend local debe estar ejecutándose y permitir este origen mediante CORS.

## Funcionalidades implementadas

* Registrar créditos.
* Consultar créditos registrados.
* Buscar créditos por nombre del cliente.
* Buscar créditos por cédula o ID.
* Buscar créditos por comercial.
* Ordenar créditos por fecha de registro.
* Ordenar créditos por valor del crédito.
* Seleccionar orden ascendente o descendente.
* Validar los datos del formulario antes de enviarlos.
* Mostrar estados de carga y error.
* Consumir la API REST del backend.
* Ejecutar la aplicación en Android mediante Capacitor.
* Diseño responsive para escritorio y dispositivos móviles.

## Registro de créditos

El formulario solicita:

* Nombre del cliente.
* Cédula o ID.
* Valor del crédito.
* Tasa de interés.
* Plazo en meses.
* Comercial que registra el crédito.

El frontend valida la información antes de realizar la solicitud.

Cuando el registro es correcto:

1. El frontend envía `<span>POST /api/credits</span>`.
2. El backend almacena el crédito.
3. El backend encola el envío de la notificación por correo en segundo plano.
4. La aplicación vuelve al listado de créditos.

La lógica de correo pertenece al backend; el frontend no realiza envíos de correo directamente.

## Consulta de créditos

La pantalla principal permite filtrar por:

* Nombre del cliente.
* Cédula o ID.
* Comercial.

También permite ordenar por:

* Fecha de registro.
* Valor del crédito.

El orden puede ser ascendente o descendente.

Los filtros y el ordenamiento se envían al backend mediante parámetros de consulta.

## Backend y API

La aplicación consume el proyecto:

```
fya-credit-api
```

Endpoints utilizados:

```
GET /api/credits
POST /api/credits
```

Documentación Swagger del backend desplegado:

```
https://fya-credit-api-production.up.railway.app/swagger
```

## Build web

Comprobar que el proyecto compila:

```
npm run build
```

## Android

La plataforma Android está integrada mediante Capacitor.

Generar los assets web para Android:

```
npm run build:android
```

Sincronizar los cambios con el proyecto nativo:

```
npx cap sync android
```

Abrir el proyecto en Android Studio:

```
npx cap open android
```

El proyecto nativo se encuentra en:

```
android/
```

## Desarrollo Android con ADB reverse

Cuando se utiliza un backend local en `<span>http://localhost:5136</span>`, un dispositivo Android conectado por USB puede acceder a él mediante:

```
adb reverse tcp:5136 tcp:5136
```

Verificar la configuración:

```
adb reverse --list
```

Esta configuración es únicamente para desarrollo local. Puede perderse al desconectar el dispositivo, reiniciar ADB o reiniciar el equipo.

No debe utilizarse para el APK o AAB de entrega.

## Generación de APK de desarrollo

Desde Android Studio:

```
Build → Generate App Bundles or APKs → Generate APKs
```

También puede generarse desde la carpeta `<span>android</span>`:

```
./gradlew assembleDebug
```

En Windows:

```
.\gradlew.bat assembleDebug
```

El APK de depuración se genera normalmente en:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Verificación realizada

Durante el desarrollo se verificó en un dispositivo Android físico:

* Consulta de créditos.
* Registro de nuevos créditos.
* Filtros.
* Ordenamiento.
* Consumo del backend desplegado mediante HTTPS.
* Funcionamiento sin `<span>adb reverse</span>` y sin depender del backend local.

## Estado del proyecto

Actualmente están implementadas las funcionalidades principales requeridas para registro, consulta, filtros y ordenamiento de créditos, además de la integración Android y el consumo del backend desplegado.

Antes de la entrega final queda pendiente:

* Ejecutar una última regresión funcional después de los cambios visuales.
* Generar y validar el APK o AAB final firmado.
