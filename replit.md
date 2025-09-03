# Hassan Nasr Portfolio/CV Application

## Overview

This is a full-stack React portfolio/CV application for Hassan Nasr, an AI & Automation Architect and Full-Stack Engineer. The application features a modern, interactive portfolio with 3D elements, dark/light theme support, and professional presentation of skills, experience, and projects. Built with a React frontend, Express backend, and PostgreSQL database, it uses modern UI components and animations to create an engaging user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, modern UI design
- **3D Graphics**: Three.js with react-three-fiber for animated background elements and visual appeal
- **Animations**: Framer Motion for smooth micro-interactions and page transitions
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Comprehensive set of Radix UI primitives wrapped with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript for type safety across the full stack
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: Hot module replacement with Vite integration for seamless development experience
- **Build System**: ESBuild for production bundling with platform-specific optimizations

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Drizzle Kit for database migrations and schema evolution
- **Development Storage**: In-memory storage implementation for rapid prototyping

### Authentication and Authorization
- **Session-based Authentication**: PostgreSQL-backed sessions for secure user state management
- **Type Safety**: Shared TypeScript schemas between client and server using Zod validation
- **User Management**: Basic user CRUD operations with username/password authentication

### External Dependencies

#### Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon database
- **drizzle-orm**: Type-safe ORM for PostgreSQL operations
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store for Express sessions

#### UI and Design System
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **lucide-react**: Modern icon library with React components
- **class-variance-authority**: Type-safe variant API for component styling

#### 3D Graphics and Animation
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and abstractions for react-three-fiber
- **framer-motion**: Production-ready motion library for React
- **three**: 3D graphics library for WebGL rendering

#### Development and Tooling
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **typescript**: Static type checking and enhanced developer experience
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling integration for Replit

#### State Management and Data Fetching
- **@tanstack/react-query**: Powerful data synchronization for React
- **wouter**: Minimalist routing library for React applications

#### Form Handling and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas

#### Utilities and Helpers
- **clsx**: Utility for constructing className strings conditionally
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: URL-safe, unique string ID generator