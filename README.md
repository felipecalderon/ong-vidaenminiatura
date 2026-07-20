# MasInsectos

Plataforma web de la fundación **MasInsectos** — organización sin fines de lucro con sede en Temuco, Chile, dedicada a reconocer, educar y proteger a los insectos y arácnidos como pilares del equilibrio ecológico.

Creemos que el bienestar animal no tiene jerarquías: toda vida merece respeto, sin importar su tamaño.

## Funcionalidades principales

- **Peticiones**: creación, publicación y recolección de firmas para causas de conservación.
- **Noticias**: artículos y contenidos educativos sobre insectos, arácnidos y ecología.
- **Autenticación**: registro e inicio de sesión con Auth0, roles de usuario (Usuario, Autor, Administrador).
- **Panel de administración**: gestión de contenidos, usuarios y categorías.
- **Firmas digitales**: cada usuario puede apoyar peticiones activas con su firma.

## Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL + Prisma ORM |
| Autenticación | Auth0 |
| Estilos | Tailwind CSS v4 + shadcn/ui + Radix UI |
| Imágenes | Cloudinary |
| Formularios | React Hook Form + Zod |
| IA | OpenAI (generación de extractos) |
| Lint/format | Biome |
| Gestor de paquetes | pnpm |

## Arquitectura

El proyecto sigue una arquitectura basada en features con separación estricta de responsabilidades:

```
src/
├── app/                  # App Router: páginas, layouts y rutas API
├── actions/              # Server Actions transversales
├── components/           # Componentes compartidos y UI
├── features/             # Lógica de negocio organizada por dominio
│   ├── categorias/       # CRUD de categorías
│   ├── firmas/           # Recolección de firmas
│   ├── noticias/         # Publicación de noticias
│   ├── peticiones/       # Gestión de peticiones
│   └── usuarios/         # Autenticación, roles y perfiles
├── lib/                  # Utilidades: Auth0, Cloudinary, Prisma, SEO, etc.
└── generated/            # Código generado (cliente Prisma)
```

Cada feature contiene su propia capa de `actions`, `components`, `queries`, `repositories`, `schemas`, `services` y `types`, garantizando que la lógica de negocio resida exclusivamente en los servicios.

### Esquema de base de datos

- **usuario**: registros de usuarios con roles (USUARIO, AUTOR, ADMINISTRADOR)
- **categoria**: categorías temáticas para peticiones y noticias
- **peticion**: peticiones con meta de firmas y flujo de estados (BORRADOR → REVISION → PUBLICADA → CERRADA → ARCHIVADA)
- **firma**: relación entre usuarios y peticiones firmadas
- **noticia**: artículos publicables con flujo de estados (BORRADOR → REVISION → PUBLICADA → ARCHIVADA)

## Requisitos

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+

## Variables de entorno

Copia `.env.example` a `.env` y configura las siguientes variables:

```
DATABASE_URL=postgresql://...
AUTH0_SECRET=...
AUTH0_CLIENT_ID=...
AUTH0_CLIENT_SECRET=...
AUTH0_DOMAIN=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
OPENAI_API_KEY=...
```

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint       # Biome check
pnpm format     # Biome format
```

La sincronización de usuarios Auth0 con la base de datos ocurre automáticamente tras el login a través de la acción `sincronizarUsuarioAutenticadoAction`.

---

**MasInsectos** — Porque cada forma de vida es una manera distinta en que el universo se observa a sí mismo.
