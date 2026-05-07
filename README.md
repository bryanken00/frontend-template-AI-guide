# Frontend Template

A production-ready React admin portal template with dual-portal architecture (Admin + SuperAdmin), role-based permissions, and a consistent design system.

## Tech Stack

- **React 19** + **Vite 7**
- **Ant Design 5** — UI component library
- **Tailwind CSS 4** — Utility-first styling
- **Lucide React** — Icon library
- **TanStack React Query** — Server state management
- **Zustand** — Client state management
- **React Router 7** — Routing
- **Axios** — HTTP client with interceptors
- **Socket.IO** — Real-time communication
- **Sentry** — Error monitoring
- **Framer Motion** — Animations

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd frontend-template

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

| Variable           | Description                          | Default                 |
| ------------------ | ------------------------------------ | ----------------------- |
| `VITE_API_URL`     | Backend API base URL                 | `http://localhost:3000` |
| `VITE_SOCKET_URL`  | WebSocket server URL                 | `http://localhost:3000` |
| `VITE_APP_NAME`    | Application name (shown in UI)       | `APP NAME`              |
| `VITE_APP_ENV`     | Environment identifier               | `development`           |
| `VITE_APP_VERSION` | App version                          | `1.0.0`                 |
| `VITE_USE_MOCK`    | Enable mock mode (no backend needed) | `false`                 |
| `VITE_SENTRY_DSN`  | Sentry DSN for error tracking        | —                       |

### Mock Mode

Set `VITE_USE_MOCK=true` to run the app without a backend. Login with any credentials:

- **Admin:** `admin@example.com` / `Admin123!`
- **SuperAdmin:** `superadmin@example.com` / `Admin123!`

## Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `npm run dev`      | Start dev server on port 5173 |
| `npm run build`    | Production build              |
| `npm run preview`  | Preview production build      |
| `npm run lint`     | Run ESLint                    |
| `npm run lint:fix` | Fix ESLint issues             |
| `npm run clean`    | Clear build cache             |

## Project Structure

```
src/
├── assets/              # Static assets (images, address data)
├── components/          # Shared components (StatCard, Layout, etc.)
├── config/              # App config (Sentry, Socket)
├── contexts/            # React contexts
├── hooks/               # Shared hooks (usePermissions, useDebounce)
├── mock/                # Mock data for development
├── pages/               # Page modules by portal
│   ├── Admin/           # Admin portal pages
│   └── SuperAdmin/      # SuperAdmin portal pages
├── routes/              # Route definitions
├── services/            # API layer
│   ├── api/             # Raw axios calls
│   └── requests/        # React Query hooks
├── store/               # Zustand stores
└── utils/               # Utility functions
```

## Architecture

### Dual Portal System

- `/admin` — Organization-level admin with role-based permissions
- `/superadmin` — System-level admin for managing organizations

### Permission System

Navigation and UI actions are gated by a permission system:

- Permissions are fetched after login via `/api/v1/admin/permissions/user`
- Sidebar navigation filters based on user permissions
- `<ProtectedRoute>` component guards page access
- `canWrite` checks gate create/edit/delete actions

### Theming

All colors are defined as CSS variables in `src/index.css`. Change the theme by editing the `@theme` block — no need to touch component files.

## Documentation

Detailed guides are in `.kiro/skills/`:

- **UI_DESIGN_SYSTEM.md** — Page layout patterns, component usage, color rules
- **FOLDER_STRUCTURE.md** — Module organization, naming conventions, route registration
- **API_GUIDE.md** — Service layer patterns, React Query hooks, checklist

## Features

- Role-based access control with permission-gated UI
- Responsive sidebar with collapsible navigation
- PH address system (Region → Province → City → Barangay)
- Password strength indicator
- CSRF protection with automatic token refresh
- Idempotency keys on mutations
- Error boundaries with Sentry integration
- Mock mode for frontend-only development
- Real-time updates via Socket.IO
