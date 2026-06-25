# VSR Global (Law Firm Dashboard)

React + TypeScript + Vite application for a law-firm style workflow UI.

## Features
- Dashboard overview (closings + requisitions)
- Search & browse files table with filters/search
- Open file details page with a multi-section form
- Responsive layout with left sidebar and sticky header
- Dark mode support (stored in `localStorage`)
- Form validation with **Zod** + **react-hook-form**

## Tech Stack
- **React** (with **React Router**)
- **Vite** + **TypeScript**
- **Tailwind CSS**
- **react-hook-form**, **zod**
- **react-icons**
- **vite-plugin-svgr** (SVG imported as React components)

## Project Structure (high level)
- `src/App.tsx` – route definitions
- `src/components/layout/` – `RootLayout` + `Header`
- `src/pages/` – page-level route entry components
- `src/features/` – feature-level UI components
- `src/data/mock-data.json` – sample data used by the UI

## Routes
Configured in `src/App.tsx`:
- `/` → redirects to `/dashboard`
- `/dashboard` → dashboard page (closings + requisitions + calendar + support panel)
- `/search-files` → files listing/search table
- `/open-files` → open/new file details form
- `*` → redirects to `/dashboard`

> Note: The codebase also navigates to `/files/:id` when selecting a file from the table (see `FilesTable`).

## Getting Started

### Prerequisites
- Node.js (LTS recommended)

### Install
```bash
npm install
```

### Run (development)
```bash
npm run dev
```
Then open the URL shown in the terminal.

### Build
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Notes
- The UI currently uses **mock data** from `src/data/mock-data.json`.
- File details saving logs to console and shows an alert; it then navigates back to `/search-files`.

