# Price Controller Frontend

Aplicación web para la gestión y control de precios de productos, con actualización automática de tasas de cambio y cálculo de márgenes de ganancia.

## 📋 Descripción

Price Controller es una aplicación frontend desarrollada en React que permite administrar un catálogo de productos y categorías, con funcionalidades de control de precios basadas en tasas de cambio actualizadas en tiempo real. La aplicación está diseñada para negocios que necesitan ajustar precios dinámicamente según la fluctuación de divisas.

## ✨ Características Principales

### Gestión de Productos
- **CRUD completo**: Crear, leer, actualizar y eliminar productos
- **Importación masiva**: Carga de productos mediante archivos
- **Actualización de precios**: Recalcular precios de productos basados en la tasa actual
- **Paginación**: Navegación eficiente de grandes catálogos

### Gestión de Categorías
- **Organización**: Clasificación de productos por categorías
- **CRUD de categorías**: Administración completa de categorías
- **Visualización en tarjetas**: Interfaz intuitiva para gestionar categorías

### Sistema de Tasas
- **Actualización en tiempo real**: Conexión SSE (Server-Sent Events) para recibir actualizaciones automáticas de tasas
- **Notificaciones**: Alertas cuando la tasa se actualiza
- **Margen global**: Configuración de margen de ganancia aplicable a todos los productos

### Autenticación
- **Login seguro**: Sistema de autenticación de usuarios
- **Rutas protegidas**: Acceso controlado a las funcionalidades principales
- **Persistencia de sesión**: Manejo de estado de autenticación con Zustand

## 🛠️ Stack Tecnológico

### Core
- **React 19.2**: Biblioteca principal para la UI
- **TypeScript 5.9**: Tipado estático
- **Vite 7.3**: Build tool y dev server

### UI/UX
- **Chakra UI 3.34**: Sistema de componentes y diseño
- **Lucide React**: Iconografía moderna
- **Emotion**: CSS-in-JS para estilos

### Estado y Datos
- **Zustand 5.0**: Gestión de estado global
- **TanStack Query 5.90**: Manejo de estado del servidor y caché
- **Axios 1.13**: Cliente HTTP para peticiones API

### Formularios y Validación
- **React Hook Form 7.71**: Gestión de formularios
- **Zod 4.3**: Validación de esquemas
- **@hookform/resolvers**: Integración de Zod con React Hook Form

### Routing
- **React Router 7.13**: Navegación y rutas


## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- pnpm (gestor de paquetes)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>

# Instalar dependencias
pnpm install
```

### Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=api-url
VITE_SSE_URL=sse-url
```

### Comandos Disponibles

```bash
# Modo desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview

# Linting
pnpm lint
```

## 🔌 Integración con Backend

La aplicación se conecta a una API REST que debe proporcionar los siguientes endpoints:

- **Auth**: `/auth/login`
- **Products**: `/products` (GET, POST, PUT, DELETE)
- **Categories**: `/categories` (GET, POST, PUT, DELETE)
- **Rates**: `/rates` (GET, actualización vía SSE)
- **Global Margin**: `/global-margin` (GET, PUT)
- **Prices**: `/prices/update` (actualización masiva)

## 🎨 Características de UI

- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Sistema de pestañas**: Navegación entre productos y categorías
- **Diálogos modales**: Para crear, editar y confirmar acciones
- **Notificaciones toast**: Feedback visual de operaciones
- **Lazy loading**: Carga diferida de componentes para mejor rendimiento

## 🔐 Seguridad

- Rutas protegidas mediante `ProtectedRoute`
- Validación de formularios con Zod
- Manejo seguro de tokens de autenticación
- Variables de entorno para configuración sensible

## 📦 Optimizaciones

- **Code splitting**: Lazy loading de rutas
- **SWC**: Compilador rápido para React
- **Terser**: Minificación de código
- **Path aliases**: Importaciones limpias con `@/`

## 🤝 Contribución

Este proyecto sigue una arquitectura modular basada en features, facilitando la escalabilidad y el mantenimiento del código.
