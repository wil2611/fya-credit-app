# AGENTS.md

## Project overview

This repository contains the frontend application for the FYA credit management technical assessment.

The application is built with Ionic React and TypeScript, uses Capacitor for Android, and communicates with the FYA Credit API through REST endpoints.

## Technology stack

* Ionic
* React
* TypeScript
* Vite
* Capacitor
* Android

## Project structure

Main application code is organized under:

```
src/
├── assets/
├── models/
├── pages/
└── services/
```

The native Android project is located in:

```
android/
```

Main pages:

```
Home
CreateCredit
```

## Service layer and models

API communication must remain separated from UI components.

Credit API operations are handled through:

```
src/services/creditService.ts
```

Pages must use the service layer instead of calling backend URLs directly.

TypeScript interfaces and request models belong in:

```
src/models/
```

Current models include:

```
Credit
CreateCreditRequest
```

## Development guidelines

* Keep components simple and readable.
* Use TypeScript types for API data.
* Keep API communication separated from UI components.
* Avoid duplicating API request logic.
* Validate form data before sending requests.
* Treat backend validation as the source of truth.
* Display clear loading and error states.
* Do not hardcode API URLs inside pages or services.
* Read the backend URL from `<span>VITE_API_URL</span>`.
* Do not commit real environment files or secrets.
* Keep `<span>.env.*.example</span>` files updated when environment requirements change.
* Keep web and Android behavior compatible.
* Run a build before completing significant changes.

## UI guidelines

The interface should remain simple and operational rather than looking like a generic dashboard template.

* Use the FYA visual identity consistently.
* Prefer clear hierarchy and practical spacing over decorative elements.
* Avoid unnecessary KPI cards, pills, large hero sections, excessive shadows, or decorative icons.
* Use cards only when they improve grouping or readability.
* Keep credit information easy to scan on desktop and mobile.
* Preserve responsive behavior when changing layout or styles.
* Do not change working business logic only to support visual adjustments.

Current shared visual variables use the FYA palette defined in the frontend styles.

## Environment configuration

The frontend reads the backend URL from:

```
VITE_API_URL
```

Real environment files must not be committed.

Example files may be committed:

```
.env.development.example
.env.android.example
```

Local files may include:

```
.env.development
.env.android
```

### Local backend

Typical local value:

```
VITE_API_URL=http://localhost:5136
```

### Production backend

Current deployed backend:

```
https://fya-credit-api-production.up.railway.app
```

Android production builds should use that HTTPS URL through `<span>.env.android</span>` or the corresponding build environment.

## API

Main endpoints:

```
GET /api/credits
POST /api/credits
```

The GET endpoint supports:

```
clientName
clientDocument
salesperson
sortBy
sortOrder
```

Do not duplicate backend filtering or sorting logic in the frontend.

Backend Swagger is available at:

```
https://fya-credit-api-production.up.railway.app/swagger
```

## Validation

The credit registration form validates:

* Client name.
* Client document.
* Credit amount greater than zero.
* Interest rate between 0 and 100.
* Term in months greater than zero.
* Salesperson.

Backend validation remains authoritative.

## Credit creation flow

The frontend should only submit the credit request and handle the result.

Expected flow:

```
CreateCredit page
    ↓
creditService.createCredit
    ↓
POST /api/credits
    ↓
backend persists credit and handles background email notification
```

Do not add email provider logic to the frontend.

## Android workflow

Before synchronizing Android:

```
npm run build:android
```

Then:

```
npx cap sync android
```

Open Android Studio with:

```
npx cap open android
```

Do not manually copy files from `<span>dist</span>` into the Android project. Capacitor should handle synchronization.

## Local Android development

For a physical Android device connected over USB, a local backend can be exposed with:

```
adb reverse tcp:5136 tcp:5136
```

This allows the device to reach:

```
http://localhost:5136
```

ADB reverse is development-only and must not be required by distributable builds.

Production Android builds should communicate directly with the deployed HTTPS backend.

## Gradle and Java

The current Android development environment uses Java 21.

Verify Java with:

```
java -version
```

From the Android directory verify Gradle with:

```
.\gradlew.bat -version
```

## Before completing a change

Run:

```
npm run build
```

For Android-related changes also run:

```
npm run build:android
npx cap sync android
```

For functional changes verify as appropriate:

* Credit listing.
* Credit creation.
* Filters.
* Sorting.
* Form validation.
* Error handling.
* Navigation between Home and CreateCredit.
* Mobile layout.

## Current functional scope

Currently implemented:

* Ionic React application.
* Credit listing.
* Credit registration.
* Frontend validation.
* API service layer.
* Filters by client name, document, and salesperson.
* Sorting by date and credit amount.
* Loading and error states.
* Responsive FYA-styled UI.
* Capacitor Android integration.
* Android build configuration.
* Physical Android device testing.
* Production backend integration over HTTPS.
* Successful operation without ADB reverse when using the deployed backend.

Remaining before final delivery:

* Run final regression tests after the latest UI changes.
* Generate the final signed APK or AAB.
* Perform final end-to-end validation of the distributable build.
