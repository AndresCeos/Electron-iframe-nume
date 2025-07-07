# Numerología Cotidiana Desktop App

## Overview

This is a desktop-style web application built with React and TypeScript that wraps an external numerology website (https://v2.numerologia-cotidiana.com) in an iframe to provide a native desktop experience. The application serves as a wrapper/container for the external service with custom desktop-like UI elements including window controls and error handling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: TailwindCSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Package Manager**: npm

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Development**: tsx for TypeScript execution in development

### Database Schema
Currently includes a basic user schema with:
- Users table (id, username, password)
- Uses Drizzle ORM for type-safe database operations
- Configured for PostgreSQL with migrations stored in `/migrations`

## Key Components

### Client-Side Components
1. **App Router**: Main application wrapper with routing and providers
2. **Home Page**: Primary interface displaying the iframe wrapper with desktop controls
3. **Not Found Page**: 404 error handling
4. **UI Components**: Comprehensive set of shadcn/ui components for consistent styling

### Server-Side Components
1. **Express Server**: HTTP server with middleware for JSON parsing and logging
2. **Route Handler**: Centralized route registration system
3. **Storage Interface**: Abstracted storage layer with in-memory implementation
4. **Vite Integration**: Development server integration with HMR support

### Desktop-like Features
- Window controls (minimize, maximize, close buttons)
- Connection status indicators
- Error handling with retry mechanisms
- Loading states and timeout handling
- Responsive design optimized for desktop usage

## Data Flow

1. **Client Request**: Browser loads the React application
2. **Iframe Loading**: Main page loads external numerology website in iframe
3. **State Management**: React state tracks loading, error, and connection status
4. **Error Handling**: Timeout and error scenarios trigger fallback UI
5. **API Communication**: TanStack Query handles server communication (when needed)
6. **Database Operations**: Drizzle ORM manages PostgreSQL interactions through storage layer

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- UI components (@radix-ui/react-* components)
- TanStack Query for server state management
- TailwindCSS for styling
- Lucide React for icons
- Various utility libraries (clsx, class-variance-authority, etc.)

### Backend Dependencies
- Express.js web framework
- Drizzle ORM with PostgreSQL adapter
- Neon Database serverless driver
- Session management with PostgreSQL store
- Development tools (tsx, esbuild for production builds)

### External Services
- **Primary Service**: https://v2.numerologia-cotidiana.com (embedded via iframe)
- **Database**: PostgreSQL database (likely Neon Database based on driver)

## Deployment Strategy

### Development
- Uses Vite dev server for frontend with HMR
- tsx for TypeScript execution on backend
- Concurrent development with hot reload
- Replit integration with specialized plugins

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: esbuild bundles TypeScript server code to `dist/index.js`
- Single production command starts Node.js server
- Static file serving integrated into Express server

### Database Management
- Drizzle Kit for schema migrations
- `db:push` command for development schema updates
- Environment-based database URL configuration

## Electron Desktop Application

### Configuration
- **Main Process**: `electron/main.js` - Main Electron process with window management
- **Preload Script**: `electron/preload.js` - Security layer for renderer process 
- **Build Config**: `electron-builder.json` - Multi-platform build configuration
- **Icons**: Custom provided icons in `assets/` directory
  - Windows: `icon.ico` (131KB)
  - macOS: `icon.icns` (42KB)

### Build Targets
- **Windows**: NSIS installer (.exe) for x64 architecture
- **macOS**: DMG installer for both Intel (x64) and Apple Silicon (arm64)
- **Output Directory**: `release/` folder

### Build Commands
- Development: `node scripts/electron-dev.js`
- Production Build: `npm run build && npx electron-builder`
- Platform Specific: `npx electron-builder --win` or `npx electron-builder --mac`

### Features
- Fullscreen iframe wrapper (removed custom header)
- Security hardened with context isolation
- Custom application icons provided by user
- Error handling and retry mechanisms
- Loading states with connection status

## Changelog

- July 07, 2025. Initial setup
- July 07, 2025. Added Electron desktop application with Windows and macOS installers

## User Preferences

Preferred communication style: Simple, everyday language.