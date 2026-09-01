# AGENTS.md

## Project overview

This repository contains the frontend application for the FYA credit management technical assessment.

The application is built with Ionic React and communicates with the FYA Credit API.

Capacitor is used to generate and run the Android application.

## Technology stack

- Ionic
- React
- TypeScript
- Vite
- Capacitor
- Android

## Project structure

Application code is organized using directories such as:

```text
src/
├── models/
├── pages/
└── services/
```

The native Android project is located in:

```text
android/
```

Pages represent complete application screens. Current main pages include:

```text
Home
CreateCredit
```

## Service layer and models

API communication should remain separated from UI components.

Credit API operations are handled through:

```text
src/services/creditService.ts
```

Pages should use the service layer instead of calling API URLs directly.

TypeScript interfaces and request models belong in:

```text
src/models/
```

Current models include:

```text
Credit
CreateCreditRequest
```

## Development guidelines

- Keep components simple and readable.
- Use TypeScript types for API data.
- Keep API communication separated from UI components.
- Avoid duplicating API request logic.
- Validate form data before sending requests.
- Backend validation remains the source of truth.
- Display clear loading and error states.
- Do not hardcode production API URLs inside components or services.
- Read the backend URL from `VITE_API_URL`.
- Do not commit environment files containing local or sensitive configuration.
- Keep example environment files updated.
- Keep the application usable on mobile devices.
- Keep Android and web configurations compatible.
- Run a build before completing significant changes.

## Environment configuration

The frontend reads the backend URL from:

```text
VITE_API_URL
```

Real environment files should not be committed. Example files may be committed:

```text
.env.development.example
.env.android.example
```

Development environments can create local copies such as:

```text
.env.development
.env.android
```

## API

The frontend communicates with the FYA Credit API.

Main endpoints:

```http
GET /api/credits
POST /api/credits
```

The GET endpoint supports:

```text
clientName
clientDocument
salesperson
sortBy
sortOrder
```

Do not implement duplicated filtering logic in the frontend when the backend already provides the required filtering and sorting.

## Validation

Forms must validate required fields before submitting requests.

The credit registration form validates:

- Client name.
- Client document.
- Credit amount.
- Interest rate.
- Term in months.
- Salesperson.

Backend validation must still be considered authoritative.

## Android workflow

Before synchronizing Android, build the frontend using:

```bash
npm run build:android
```

Then synchronize Capacitor:

```bash
npx cap sync android
```

Open the native project with:

```bash
npx cap open android
```

Do not manually copy files from `dist` into the Android project. Capacitor synchronization should handle web asset updates.

### Local development with ADB reverse

During local development with a physical Android device connected through USB, ADB reverse may be used:

```bash
adb reverse tcp:5136 tcp:5136
```

This allows the Android application to access a backend running on the developer machine using:

```text
http://localhost:5136
```

ADB reverse is a development-only solution and must not be treated as the production backend configuration.

For a distributable APK or AAB, use a publicly accessible backend URL, preferably HTTPS.

### Gradle and Java

Gradle should use a compatible Java version. The current development environment uses Java 21.

Before debugging Gradle issues, verify:

```bash
java -version
```

And from the Android directory:

```powershell
.\gradlew.bat -version
```

## Before completing a change

Run:

```bash
npm run build
```

For Android-related changes also run:

```bash
npm run build:android
npx cap sync android
```

When appropriate, verify the application on an Android device.

For API-related changes verify:

- Credit listing.
- Credit creation.
- Filters.
- Sorting.
- Error handling.

## Current functional scope

Currently implemented:

- Ionic React project.
- Capacitor configuration.
- Credit listing interface.
- Credit registration form.
- Credit API integration.
- Frontend form validation.
- Credit filters.
- Credit sorting.
- Loading and error states.
- Android platform integration.
- Android build.
- Execution and validation on a physical Android device.

Still to be completed before final delivery:

- Configure the production/public backend URL.
- Generate the final APK or AAB using the deployed backend.
- Perform final end-to-end verification.
