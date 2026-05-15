# Document Client App

Angular 18 standalone enterprise frontend for the ICMP document workflow platform.

## Backend alignment

The app authenticates through the API Gateway and drives the asynchronous workflow:

`Login → API Gateway → ICMPAPI → Kafka workflow → Orchestrator → Replication → Dashboard status updates`

Default development gateway: `http://localhost:7000`.

## Features

- JWT login, refresh-token retry, session-scoped token storage, route and role guards.
- Centralized API wrapper, retry handling, global error handling, correlation-id propagation and frontend logging.
- Dashboard cards, status chart bars, workflow table and retry UI from `GET /gateway/dashboard`.
- Drag-and-drop large document upload with metadata and upload progress to `POST /gateway/documents/upload`.
- Workflow tracking with polling timeline from `GET /gateway/documents/status/{id}`.
- Secure role-protected downloads and audit history from `GET /gateway/download/{id}`.
- Notification panel, Material snackbar toasts and polling alerts.
- Enterprise layout with toolbar, sidenav and dark/light toggle.
- Production Docker image with nginx SPA fallback and `/api` gateway proxy.

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200` and sign in using backend credentials.

## Production build

```bash
npm run build
```

The production environment maps the API gateway base URL to `/api`, which nginx proxies to `http://host.docker.internal:7000` by default.

## Docker

```bash
docker build -t document-client-app .
docker run --rm -p 8080:80 document-client-app
```

Open `http://localhost:8080`.

## Key paths

- `src/app/core`: auth, services, guards, interceptors, constants, models and utilities.
- `src/app/shared`: reusable layout, components, directives and pipes.
- `src/app/features`: lazy-loaded business screens.
- `src/app/environments`: environment-specific API gateway configuration.
