# FYA Credit App

Aplicación móvil desarrollada para la prueba técnica de registro y consulta de créditos.

El proyecto utiliza Ionic + React para la interfaz y Capacitor para generar la aplicación Android.

## Tecnologías

- Ionic
- React
- TypeScript
- Vite
- Capacitor
- Android

## Requisitos

Para ejecutar el proyecto se necesita:

- Node.js
- npm
- Ionic CLI
- Android Studio, para trabajar con Android
- Android SDK, para compilar la aplicación móvil
- Java 21, para la compilación con Gradle

## Instalación

Instalar las dependencias:

```bash
npm install
```

## Configuración del backend

La URL del backend se configura mediante:

```text
VITE_API_URL
```

Los archivos de entorno reales no se almacenan en el repositorio. Se incluyen archivos de ejemplo:

```text
.env.development.example
.env.android.example
```

Para desarrollo web se puede crear `.env.development` con:

```env
VITE_API_URL=http://localhost:5136
```

Para Android se puede crear `.env.android`. Un ejemplo para desarrollo local utilizando ADB reverse es:

```env
VITE_API_URL=http://localhost:5136
```

## Ejecución local

Ejecutar la aplicación:

```bash
ionic serve
```

La aplicación normalmente estará disponible en:

```text
http://localhost:8100
```

El backend debe estar ejecutándose y permitir este origen mediante CORS.

## Funcionalidades implementadas

- Registrar créditos.
- Consultar créditos registrados.
- Buscar créditos por nombre del cliente.
- Buscar créditos por cédula o ID.
- Buscar créditos por comercial.
- Ordenar créditos por fecha de registro.
- Ordenar créditos por valor del crédito.
- Seleccionar orden ascendente o descendente.
- Validar los datos del formulario antes de enviarlos.
- Mostrar estados de carga y errores.
- Consumir la API REST del backend.
- Ejecutar la aplicación en Android mediante Capacitor.

## Registro de créditos

El formulario solicita:

- Nombre del cliente.
- Cédula o ID.
- Valor del crédito.
- Tasa de interés.
- Plazo en meses.
- Comercial que registra el crédito.

El frontend valida los datos antes de realizar la solicitud.

Cuando el registro es correcto:

1. El frontend envía `POST /api/credits`.
2. El backend almacena el crédito.
3. El backend procesa la notificación por correo en segundo plano.
4. La aplicación vuelve al listado de créditos.

## Consulta de créditos

La pantalla principal permite filtrar por:

- Nombre del cliente.
- Cédula o ID.
- Comercial.

También permite ordenar por:

- Fecha de registro.
- Valor del crédito.

El orden puede ser ascendente o descendente.

Los filtros y el ordenamiento son enviados al backend mediante parámetros de consulta.

## Backend y API

La aplicación consume la API del proyecto:

```text
fya-credit-api
```

Endpoints principales utilizados:

```http
GET /api/credits
POST /api/credits
```

La URL del backend se obtiene desde la variable `VITE_API_URL`.

## Verificación y sincronización

Comprobar que el proyecto web compila:

```bash
npm run build
```

Para generar el build utilizado por Android:

```bash
npm run build:android
```

Después se debe sincronizar con Capacitor:

```bash
npx cap sync android
```

## Android

La plataforma Android está configurada mediante Capacitor.

Para abrir el proyecto nativo:

```bash
npx cap open android
```

El proyecto Android se encuentra en:

```text
android/
```

La aplicación fue probada durante el desarrollo en un dispositivo Android físico mediante depuración USB.

### Acceso al backend local con ADB reverse

Para acceder al backend local desde un dispositivo Android conectado por USB se puede utilizar ADB reverse.

Con el backend ejecutándose en:

```text
http://localhost:5136
```

Ejecutar:

```bash
adb reverse tcp:5136 tcp:5136
```

Verificar la configuración con:

```bash
adb reverse --list
```

Debe aparecer:

```text
tcp:5136 tcp:5136
```

Esta configuración es únicamente para desarrollo local y puede perderse al desconectar el dispositivo o reiniciar ADB.

### Generación del APK

Desde Android Studio se puede utilizar:

```text
Build → Generate App Bundles or APKs → Generate APKs
```

También puede generarse desde la carpeta `android`:

```bash
./gradlew assembleDebug
```

En Windows:

```powershell
.\gradlew.bat assembleDebug
```

El APK de depuración se genera normalmente en:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Estado del proyecto

Actualmente se encuentran implementadas las funcionalidades principales de registro, consulta, filtros y ordenamiento de créditos.

La aplicación también ha sido ejecutada y validada en un dispositivo Android físico.

Antes de la entrega final se debe configurar una URL pública HTTPS para el backend y generar el APK o AAB correspondiente.
