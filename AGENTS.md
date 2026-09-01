# AGENTS.md

## Project overview

This repository contains the frontend application for the FYA credit management technical assessment.

The application is built with Ionic React and communicates with the FYA Credit API.

## Technology stack

- Ionic
- React
- TypeScript
- Capacitor

## Development guidelines

- Keep components simple and readable.
- Use TypeScript types for API data.
- Keep API communication separated from UI components.
- Avoid duplicating API request logic.
- Validate form data before sending requests.
- Display clear loading and error states.
- Do not hardcode production API URLs or sensitive values.
- Keep the application usable on mobile devices.

## Project structure

Application code should be organized using directories such as:

```text
src/
├── components/
├── models/
├── pages/
└── services/
```

### Pages

Pages represent complete application screens.

### Components

Reusable interface elements belong in the components directory.

### Services

API requests and external communication should be handled through services instead of being implemented directly inside pages.

### Models

TypeScript interfaces and data models belong in the models directory.

## API

The frontend communicates with the FYA Credit API.

Expected endpoints include:

```http
GET /api/credits
POST /api/credits
```

The API also supports credit filters and sorting.

## Validation

Forms should validate required fields before making requests.

Backend validation must still be considered the source of truth.

## Before completing a change

Run:

```bash
npm run build
```

The project should compile without errors.

Test the application locally using:

```bash
ionic serve
```

## Current functional scope

Currently implemented:

- Ionic React project initialization.
- Capacitor configuration.
- Credit listing interface.
- Credit registration form.
- Credit API integration.
- Frontend form validation.

Still to be implemented:

- Credit filters.
- Credit sorting.
- Android build.
